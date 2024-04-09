import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalIdQuery,
  useDeliverOrderMutation,
} from "@/slices/order.api.slice";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: isLoadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: isLoadingDeliver }] =
    useDeliverOrderMutation();

  const {
    data: paypal,
    isLoading: isLoadingPaypal,
    error: errorPaypal,
  } = useGetPaypalIdQuery();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoadingPaypal && !errorPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [isLoadingPaypal, paypal, errorPaypal, order, paypalDispatch]);

  const handleDelivered = async () => {
    try {
      const res = await deliverOrder(orderId);

      if (!res.error) {
        refetch();
        toast({
          variant: "success",
          description: "Order has been delivered",
        });
      } else {
        toast({
          variant: "destructive",
          description: res.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast({
          variant: "success",
          description: "Payment successfull",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: error?.data?.message || error.message,
        });
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast({
      variant: "success",
      description: "Payment successfull",
    });
  }

  function onError(error) {
    toast({
      variant: "destructive",
      description: error.message,
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              // currency_code: "USD",
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return (
    <>
      {isLoading && <Spinner> Loading...</Spinner>}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Status</AlertTitle>
          <AlertDescription>
            {error?.data?.message || error.message}
          </AlertDescription>
        </Alert>
      )}

      {order && (
        <>
          <p className="mb-4 font-bold h3">Order : {orderId}</p>
          <div className="flex gap-6 justify-center items-start">
            <div className="flex flex-col gap-4">
              <Card className=" min-w-fit border-0  shadow-none  ">
                <CardHeader className="px-0 w-fit">
                  <CardTitle>Shipping</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-x-1 flex flex-col gap-2">
                    <div>
                      <span className="font-semibold">Name : </span>
                      <span>{order.user.name}, </span>
                    </div>
                    <div>
                      <span className="font-semibold">Email : </span>
                      <span>{order.user.email}, </span>
                    </div>
                    <div>
                      <span className="font-semibold">Address : </span>
                      <span>{order.shippingAddress.city}, </span>
                      <span>{order.shippingAddress.address}, </span>
                      <span>{order.shippingAddress.postalCode} </span>
                    </div>
                    <div className="font-semibold">
                      Contact :
                      <span>
                        {formatPhoneNumber(order.shippingAddress.phone)}
                      </span>
                    </div>
                    <div>
                      <Alert
                        variant={order.isDelivered ? "success" : "destroy"}
                      >
                        <AlertDescription>
                          {order.isDelivered
                            ? ` order delivered : ${order.deliveredAt}`
                            : " order  not delivered yet"}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Separator />
              <Card className=" min-w-fit border-0 shadow-none">
                <CardContent className="px-0 w-fit">
                  <CardTitle>Payment</CardTitle>
                </CardContent>
                <CardContent className="px-0">
                  <div className="space-x-1">
                    <span className="font-semibold">Method : </span>
                    <span>{order.paymentMethod} </span>
                  </div>
                  <div>
                    <Alert variant={order.isPaid ? "success" : "destroy"}>
                      <AlertDescription>
                        {order.isPaid
                          ? ` order paid : ${order.paidAt}`
                          : " order  not paid yet"}
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              <Separator />
              {order.orderItems && (
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-semibold leading-none tracking-tight my-3">
                    Order Items
                  </p>
                  {order.orderItems.map((item) => (
                    // <CardContent key={item._id} className="relative gap-2 flex h-20 items-center p-2 justify-between">
                    <div
                      key={item._id}
                      className=" grid grid-cols-3 items-center gap-6 "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-12 rounded-md"
                      />
                      <Link to={`/product/${item._id}`}>
                        <Button variant="link">{item.name}</Button>
                      </Link>
                      <p>
                        {item.price} * {item.qty} = {item.price * item.qty}
                        {" FCFA"}
                      </p>
                    </div>
                    // </CardContent>
                  ))}
                </div>
              )}
            </div>
            {order.orderItems && (
              <div>
                <Card className=" min-w-[400px]">
                  <CardHeader className=" w-fit">
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <Separator className="my-1" />
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <p>items:</p>
                      <p>{order.itemsPrice} FCFA</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping:</p>
                      <p>{order.shippingPrice} FCFA</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Total:</p>
                      <p className="font-semibold">{order.totalPrice} FCFA</p>
                    </div>
                  </CardContent>
                  <CardContent>
                    {!order.isPaid && (
                      <CardContent>
                        {isPending ? (
                          <Loader2 />
                        ) : (
                          <div>
                            <div>
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </CardContent>
                  <div>{error && <div>{error}</div>}</div>

                  <Separator className="my-1" />

                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <CardFooter>
                        <Button onClick={handleDelivered} variant="default">
                          {isLoadingDeliver && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Mark as Delivered
                        </Button>
                      </CardFooter>
                    )}
                </Card>
                {/* payment block */}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderScreen;

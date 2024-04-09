import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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
import Stepper from "@/components/Stepper.component";
import { useCreateOrderMutation } from "@/slices/order.api.slice";
import { clearCartItems } from "@/slices/cart.slice";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {
    cartItems,
    itemPrice,
    shippingPrice,
    totalPrice,
    shippingAddress,
    paymentMethod,
  } = cart;
  const { toast } = useToast();

  console.log(cart);
  useEffect(() => {
    if (!shippingAddress.address || !paymentMethod) {
      navigate("/checkout");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      });
      // console.log(res);
      if (!res.error) {
        dispatch(clearCartItems());
        navigate(`/order/${res?.data._id}`);
      } else {
        toast({
          variant: "destructive",
          description: res.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error,
      });
    }
  };

  return (
    <>
      <Stepper step={3} />
      <div className="flex gap-6 justify-center items-start">
        <div className="flex flex-col gap-4">
          <Card className=" min-w-fit border-0  shadow-none  ">
            <CardHeader className="px-0 w-fit">
              <CardTitle>Shipping</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-x-1 flex gap-5">
                <div>
                  <span className="font-semibold">Address : </span>
                  <span>{shippingAddress.city}, </span>
                  <span>{shippingAddress.address}, </span>
                  <span>{shippingAddress.postalCode} </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-6 w-0.5 space-x-8 "
                />
                <div className="font-semibold">Contact : </div>
                <div>{formatPhoneNumber(shippingAddress.phone)}</div>
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
                <span>{paymentMethod} </span>
              </div>
            </CardContent>
          </Card>

          <Separator />
          {cartItems.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-semibold leading-none tracking-tight my-3">
                Order Items
              </p>
              {cartItems.map((item) => (
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
        {cartItems.length > 0 && (
          <Card className=" min-w-[400px]">
            <CardHeader className=" w-fif">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <Separator className="my-1" />
            <CardContent>
              <div className="flex justify-between">
                <p>items:</p>
                <p>{cart.itemPrice} FCFA</p>
              </div>
            </CardContent>

            <Separator className="my-1" />
            <CardContent>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>{cart.shippingPrice} FCFA</p>
              </div>
            </CardContent>

            <Separator className="my-1" />
            <CardContent>
              <div className="flex justify-between">
                <p>Total:</p>
                <p className="font-semibold text-primary">
                  {cart.totalPrice} FCFA
                </p>
              </div>
            </CardContent>

            <Separator className="my-1" />
            <div>{error && <div>{error}</div>}</div>

            <Separator className="my-1" />

            <CardFooter>
              <Button
                className="rounded-full"
                onClick={() => {
                  handlePlaceOrder();
                }}
                disabled={cartItems.length === 0 || isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Place order
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
};

export default PlaceOrderScreen;

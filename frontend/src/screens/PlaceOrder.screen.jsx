import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import Cart from "../components/cart.component";
import { useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  return (
    <>
      <p className="mb-4 font-bold h3">Shopping cart</p>
      <div className="flex gap-6 justify-center items-start">
        <div className="flex flex-col gap-4">
          <Card className=" min-w-fit border-0">
            <CardHeader className=" w-fit">
              <CardTitle>Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-x-1">
                <span>Address : </span>
                <span>{shippingAddress.city}, </span>
                <span>{shippingAddress.address}, </span>
                <span>{shippingAddress.postalCode} </span>
              </div>
            </CardContent>
          </Card>
          <Separator className="my-1" />
          <Card className=" min-w-fit border-0">
            <CardHeader className=" w-fit">
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-x-1">
                <span>Method : </span>
                <span>{paymentMethod.paymentMethod} </span>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-1" />
          {cartItems.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="">Order Items</p>
              {cartItems.map((item) => (
                // <CardContent key={item._id} className="relative gap-2 flex h-20 items-center p-2 justify-between">
                <div key={item._id} className=" flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="size-12" />
                  <p>{item.name} </p>
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
                <p>items</p>
                <p>{cart.itemPrice} FCFA</p>
              </div>
            </CardContent>

            <Separator className="my-1" />
            <CardContent>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{cart.shippingPrice} FCFA</p>
              </div>
            </CardContent>

            <Separator className="my-1" />
            <CardContent>
              <div className="flex justify-between">
                <p>Total</p>
                <p className="font-semibold">{cart.totalPrice} FCFA</p>
              </div>
            </CardContent>

            <Separator className="my-1" />

            <CardFooter>
              <Button variant="outline" onClick={() => {}}>
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

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

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/login?redirect=/checkout");
  };

  return (
    <>
      <p className="mb-4 font-bold h3">Shopping cart</p>
      <div className="flex gap-6 justify-center items-start">
        {cartItems.length > 0 && (
          <div className="">
            {cartItems.map((item) => (
              <Cart
                key={item._id}
                className="relative gap-2 flex h-20 items-center p-2 justify-between"
                product={item}
              ></Cart>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <Card className="">
            <CardHeader className=" w-fit">
              <CardTitle>
                Subtotal Item -{" "}
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {" "}
              {cartItems.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
              )}{" "}
              FCFA
            </CardContent>
            <CardContent> </CardContent>

            <Separator className="my-2" />

            <CardFooter>
              <Button variant="outline" onClick={() => checkoutHandler()}>
                Proceed to checkout
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
};

export default CartScreen;

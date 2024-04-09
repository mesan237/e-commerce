import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import Cart from "../components/cart.component";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatMoney } from "@/utils/formatMoney";

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
      {cartItems.length === 0 && (
        <Alert>
          <AlertTitle>No item(s)</AlertTitle>
          <AlertDescription>
            The cart is empty. Please lick here to go{" "}
            <Link to="/">
              <Button variant="link" className="p-0">
                Shopping
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}
      <div className="flex gap-6 justify-center items-start">
        {cartItems.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Product</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price (FCFA)</TableHead>
                <TableHead className="text-center">Remove</TableHead>
              </TableRow>
            </TableHeader>
            {cartItems.map((item) => (
              <Cart
                key={item._id}
                className="relative gap-2 flex h-20 items-center p-2 justify-between"
                product={item}
              ></Cart>
            ))}
          </Table>
        )}

        {cartItems.length > 0 && (
          <>
            <Card className="w-1/4">
              <CardHeader className=" w-fit mx-auto">
                <CardTitle>
                  Subtotal Item -{" "}
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-primary text-center">
                  {" "}
                  {formatMoney(
                    cartItems.reduce(
                      (acc, item) => acc + item.price * item.qty,
                      0
                    )
                  )}{" "}
                  FCFA
                </CardTitle>
              </CardContent>

              <Separator className="my-2" />

              <CardFooter className="text-center">
                <Button
                  onClick={() => checkoutHandler()}
                  className="rounded-full"
                >
                  Proceed to checkout
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;

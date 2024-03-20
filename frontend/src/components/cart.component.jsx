import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cart.slice";

const cart = ({ product }) => {
  const dispatch = useDispatch();

  const AddCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const deleteCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <Card
        key={product._id}
        className="flex h-20 items-center p-2 justify-between gap-6"
      >
        <CardHeader className="h-full p-0">
          <CardImage className="h-16" src={product.image} alt={product.name} />
        </CardHeader>
        <CardContent className="p-0">
          <CardTitle className="text-[16px] text-wrap w-60">
            {product.name}
          </CardTitle>
        </CardContent>
        <CardContent className="p-0"> {product.price} FCFA</CardContent>
        <CardContent className="p-0">
          {
            <Select
              value={product.qty}
              onValueChange={(value) => AddCartHandler(product, Number(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(product.countInStock).keys()].map((index) => (
                  <SelectItem value={index + 1} key={index}>
                    {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        </CardContent>
        <CardFooter className="p-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => deleteCartHandler(product._id)}
          >
            <FaTrash className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default cart;

import { CardImage, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cart.slice";
import { Link } from "react-router-dom";
import { formatMoney } from "@/utils/formatMoney";

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
      <TableBody>
        <TableRow>
          <TableCell>
            <CardImage
              className="size-24"
              src={product.image}
              alt={product.name}
            />
          </TableCell>
          <TableCell>
            <Link to={`/product/${product._id}`}>
              <Button variant="link" className="text-left">
                <CardTitle className="text-[16px] text-wrap w-60">
                  {product.name}
                </CardTitle>
              </Button>
            </Link>
          </TableCell>
          <TableCell>
            {
              <Select
                value={product.qty}
                onValueChange={(value) =>
                  AddCartHandler(product, Number(value))
                }
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
          </TableCell>
          <TableCell>{formatMoney(product.price)}</TableCell>
          <TableCell className="text-center ">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => deleteCartHandler(product._id)}
            >
              <FaTrash className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default cart;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
// import { products } from "../../../backend/datas/products.js";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useGetProductDetailsQuery } from "@/slices/product.api.slice";
import { AlertCircle } from "lucide-react";
import { addToCart } from "@/slices/cart.slice";

const ProductScreen = () => {
  const id = useParams();
  const [qty, setQty] = useState(1);
  const { data: product, error, isLoading } = useGetProductDetailsQuery(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <p className="mb-4 font-bold h3">Product description</p>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.data?.message || error.message}
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner> Loading...</Spinner>}

      {product && (
        <div className="flex gap-8 justify-center items-start">
          <img className="w-72" src={product.image} />
          <div className="w-80">
            <h1 className="h2">{product.name}</h1>
            <Separator className="my-4" />

            <div className="flex-1">
              <Rating rating={product.rating} />{" "}
              <span> {product.numReviews} reviews</span>
            </div>
            <Separator className="my-4" />
            <div className="flex-1">Price: {product.price} FCFA</div>
            <Separator className="my-4" />
            <div className="flex-1">
              Number of reviews: {product.description}
            </div>
          </div>

          <Card className="h-fit w-80">
            <CardHeader className="flex flex-row items-center justify-between">
              <p className="">Price: </p>
              <p className="">{product.price} FCFA</p>
            </CardHeader>

            <Separator className="my-2" />
            <CardContent className="flex justify-between">
              <p>Status :</p>
              {product.countInStock > 0 ? (
                <Badge variant="succes">In stock</Badge>
              ) : (
                <Badge variant="wrong">out of stock</Badge>
              )}
            </CardContent>

            <Separator className="my-2" />

            <CardContent className="flex justify-between items-baseline">
              <p>Quantity :</p>
              <Select value={qty} onValueChange={setQty}>
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
            </CardContent>

            <Separator className="my-2" />
            <CardFooter>
              <Button disabled={!product.countInStock} onClick={handleCart}>
                Add To Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductScreen;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
// import { products } from "../../../backend/datas/products.js";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";

const ProductScreen = () => {
  const [product, setProduct] = useState([]);
  const id = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id.productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  const {
    stock: countInStock,
    rating,
    numReviews,
    name,
    description,
    price,
    image,
  } = product;

  return (
    <div className="flex gap-8 justify-center">
      <img className="w-72" src={image} />
      <div className="w-80">
        <h1 className="h2">{name}</h1>
        <Separator className="my-4" />

        <div className="flex-1">
          <Rating rating={rating} /> <span> {numReviews} reviews</span>
        </div>
        <Separator className="my-4" />
        <div className="flex-1">Price: {price} FCFA</div>
        <Separator className="my-4" />
        <div className="flex-1">Number of reviews: {description}</div>
      </div>

      <Card className="h-fit w-80">
        <CardHeader className="flex flex-row items-center justify-between">
          <p className="">Price: </p>
          <p className="">{price} FCFA</p>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="flex justify-between">
          <p>Status :</p>
          {countInStock > 0 ? (
            <Badge variant="succes">In stock</Badge>
          ) : (
            <Badge variant="wrong">out of stock</Badge>
          )}
        </CardContent>
        <Separator className="my-2" />
        <CardFooter>
          <Button disabled={!countInStock}>Add To Cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductScreen;

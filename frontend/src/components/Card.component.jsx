import { Link } from "react-router-dom";
import rasp from "../assets/images/raspberry-pi.jpeg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";

import Rating from "./Rating";

const CardComponent = ({ product }) => {
  const { image, name, price, _id, numReviews, rating } = product;

  return (
    <>
      <Card className="flex-1 min-w-72">
        <Link to={`product/${_id}`}>
          <CardHeader>
            <CardImage src={image} alt={name} />
          </CardHeader>
        </Link>

        <CardContent>
          <Link to={`product/${_id}`}>
            <CardTitle className="text-ellipsis text-nowrap overflow-hidden">
              {name}
            </CardTitle>
          </Link>
        </CardContent>

        <CardFooter className=" flex flex-col items-baseline">
          <div className="flex gap-2">
            <Rating rating={rating} /> <span> {numReviews} reviews</span>
          </div>
          <p>{price} FCFA</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardComponent;

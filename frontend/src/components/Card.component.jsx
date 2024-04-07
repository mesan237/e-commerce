import { Link } from "react-router-dom";
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
      <Card className="flex-1 min-w-72 h-[29rem] card-gradient">
        <Link to={`product/${_id}`}>
          <CardHeader>
            <CardImage src={image} alt={name} />
          </CardHeader>
        </Link>

        <CardContent>
          <Link to={`product/${_id}`}>
            <CardTitle className="text-ellipsis text-nowrap overflow-hidden text-[1.3rem]">
              {name}
            </CardTitle>
          </Link>
        </CardContent>

        <CardFooter className=" flex flex-col items-baseline">
          <div className="flex gap-2">
            <Rating rating={rating} />{" "}
            <span className=" text-muted-foreground"> ({numReviews})</span>
          </div>
          <p>{price} FCFA</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardComponent;

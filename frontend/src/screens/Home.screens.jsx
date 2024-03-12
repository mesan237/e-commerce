import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/constants/Products";

const Home = () => {
  console.log(products[1].image);
  return (
    <>
      {products.map((product) => (
        <Card className="" key={product._id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardImage src={product.image} alt={product.name} />

            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{product.price}</p>
          </CardContent>
          <CardFooter>
            <p>{product.numReviews}</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default Home;

import CardComponent from "@/components/Card.component";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

import { useGetProductsQuery } from "@/slices/product.api.slice";

const Home = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  console.log(products && products, "Products");

  return (
    <div className="flex gap-10 flex-wrap">
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
      {products?.length > 0 &&
        products.map((product) => (
          <CardComponent key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Home;

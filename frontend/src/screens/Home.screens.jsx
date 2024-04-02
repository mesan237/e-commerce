// import { useState,useEffect } from "react";
import CardComponent from "@/components/Card.component";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, MoveLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Link, useParams } from "react-router-dom";

import { useGetProductsQuery } from "@/slices/product.api.slice";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/ProductCaroussel";

const Home = () => {
  const { pageNumber, keyword } = useParams();

  const { data, error, isLoading } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {keyword && (
        <Link to="/">
          <Button
            variant="outline"
            className="gap-1 text-primary font-semibold"
          >
            <MoveLeft size={20} />
            Go back
          </Button>
        </Link>
      )}
      <ProductCarousel />

      <p className="mb-4 font-bold h3">Recent products</p>
      <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2  gap-10">
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
        {data?.products?.length > 0 &&
          data?.products.map((product) => (
            <CardComponent key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Home;

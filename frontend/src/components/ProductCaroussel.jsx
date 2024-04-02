import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useGetTopProductsQuery } from "@/slices/product.api.slice";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { Spinner } from "./ui/spinner";

export function ProductCarousel() {
  const { data: topProducts, error, isLoading } = useGetTopProductsQuery();

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  console.log(topProducts && topProducts);
  return (
    <>
      {error && (
        <Alert variant="destructive">
          {console.log(error)}
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.data?.message || error.message}
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner> Loading...</Spinner>}
      {topProducts && (
        <Carousel
          plugins={[plugin.current]}
          // w-full
          className=" max-w-[500px] mx-auto "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="">
            {topProducts.map((product, index) => (
              <CarouselItem key={index} className="">
                <div className="p-1 ">
                  <Card className="">
                    <CardContent className=" flex aspect-auto items-center justify-center p-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className=" rounded-md"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
}

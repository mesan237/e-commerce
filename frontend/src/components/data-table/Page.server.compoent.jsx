import { useGetProductsQuery } from "@/slices/product.api.slice";

import { columns } from "./columns.client.component";
import { DataTable } from "./DataTable.client.component";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useEffect } from "react";
import { useState } from "react";

export default function AdminProductScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const [data, setData] = useState([]);

  useEffect(() => {
    let items = [];
    if (products) {
      products.forEach((product) =>
        items.push({
          id: product._id,
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          brand: product.brand,
          category: product.category,
          stock: product.countInStock,
        })
      );
      setData(items);
    }
  }, [products]);
  console.log(data && data);

  return (
    <>
      <p className="mb-4 font-bold h3">Product description</p>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.data.message || error.error}
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner> Loading...</Spinner>}

      {products && data && (
        <div className=" mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
}

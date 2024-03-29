import { useGetProductsQuery } from "@/slices/product.api.slice";

import { columns } from "../../components/data-table/columns.client.component";
import { DataTable } from "../../components/data-table/DataTable.client.component";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Spinner } from "../../components/ui/spinner";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRefetch } from "@/slices/fetch.slice";

export default function AdminProductScreen() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { rerender } = useSelector((state) => state.fetch);

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
    if (rerender === true) {
      refetch();
      dispatch(setRefetch(false));
    }
  }, [products, rerender, dispatch, refetch]);
  // console.log(rerender);
  // console.log(data && data);

  return (
    <>
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
        <>
          <div className=" mx-auto py-10">
            <DataTable columns={columns} data={data} refetch={refetch} />
          </div>
        </>
      )}
    </>
  );
}

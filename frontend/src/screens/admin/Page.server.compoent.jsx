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
import { useParams } from "react-router-dom";

export default function AdminProductScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { rerender } = useSelector((state) => state.fetch);

  useEffect(() => {
    let items = [];
    if (data?.products) {
      data?.products.forEach((product) =>
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
      setProducts(items);
    }
    if (rerender === true) {
      refetch();
      dispatch(setRefetch(false));
    }
  }, [data, rerender, dispatch, refetch]);
  // console.log(rerender);
  // console.log(pageNumber, keyword);

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.data?.message || error?.message}
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner> Loading...</Spinner>}

      {products && data && (
        <>
          <div className=" mx-auto ">
            <DataTable columns={columns} data={products} />
          </div>
        </>
      )}
    </>
  );
}

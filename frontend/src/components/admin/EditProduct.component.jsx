import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from "@/slices/product.api.slice";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Spinner } from "../ui/spinner";
import EditionProduct from "./editionProduct";

export function EditProduct({ productId, openUpdate, setOpenUpdate }) {
  const [updateProduct, { isLoading: loadingProduct }] =
    useUpdateProductMutation();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery({ productId });

  return (
    <>
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
      {product && (
        <>
          <EditionProduct
            productId={productId}
            product={product}
            updateProduct={updateProduct}
            loadingProduct={loadingProduct}
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
          />
        </>
      )}
    </>
  );
}

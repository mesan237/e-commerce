import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

import { setRefetch } from "@/slices/fetch.slice";
import { useCreateProductMutation } from "@/slices/product.api.slice";
import { useUploadProductImageMutation } from "@/slices/product.api.slice";

const AddProduct = ({ setOpenCreate }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const [image, setImage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data.picture[0]);
    const formData = new FormData();
    formData.append("image", data.picture[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      if (!res.error) {
        toast({
          variant: "success",
          description: "image has been added",
        });
        console.log(res.image);

        try {
          const datas = { image: res.image, ...data };
          const result = await createProduct(datas);
          if (!result.error) {
            toast({
              variant: "success",
              description: "Product has been added",
            });
            dispatch(setRefetch(true));
            setOpenCreate(false);
          } else {
            toast({
              variant: "destructive",
              description: result.error.data.message,
            });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            description: error.data.message,
          });
        }
      } else {
        toast({
          variant: "destructive",
          description: res.error.data.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.data.message,
      });
    }
  };

  return (
    <div>
      <>
        <DialogHeader>
          <DialogTitle>Create a Product</DialogTitle>
          <DialogDescription>
            {`Enter the product's detail. Click create when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                // defaultValues={product.name}
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                brand
              </Label>
              <Input
                id="brand"
                className="col-span-3"
                {...register("brand", {
                  required: "brand is required",
                })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                category
              </Label>
              <Input
                {...register("category", {
                  required: "category is required",
                })}
                id="category"
                type="text"
                className={`col-span-3 ${
                  errors.category ? "border-error" : null
                }`}
              />
              {errors.category && (
                <span className=" absolute top-14 right-0 text-error">
                  {errors.category.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                price
              </Label>
              <Input
                {...register("price", {
                  required: "price is required",
                })}
                id="price"
                type="text"
                className={`col-span-3 ${errors.price ? "border-error" : null}`}
              />
              {errors.price && (
                <span className=" absolute top-14 right-0 text-error">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="countInStock" className="text-right">
                Stock
              </Label>
              <Input
                {...register("countInStock", {
                  required: "countInStock is required",
                })}
                id="countInStock"
                type="text"
                className={`col-span-3 ${
                  errors.countInStock ? "border-error" : null
                }`}
              />
              {errors.countInStock && (
                <span className=" absolute top-14 right-0 text-error">
                  {errors.countInStock.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>

              <Textarea
                {...register("description", {
                  required: "description is required",
                })}
                placeholder="Type your description here."
                id="description"
                className={`col-span-3 ${
                  errors.description ? "border-error" : null
                }`}
              />

              {errors.description && (
                <span className=" absolute top-14 right-0 text-error">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="relative grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right">
                Picture
              </Label>
              <Input
                id="picture"
                type="file"
                {...register("picture", {
                  required: "picture is required",
                  onChange: (event) => {
                    setImage(event.target.files[0].name);
                  },
                })}
              />

              <p className=" text-primary text-[13px]">{image}</p>
              {errors.picture && (
                <span className=" absolute top-14 right-0 text-error">
                  {errors.picture.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loadingCreate}>
              {loadingCreate && <Loader2 className=" animate-spin" />}
              Create Product
            </Button>
          </DialogFooter>
        </form>
      </>
    </div>
  );
};

export default AddProduct;

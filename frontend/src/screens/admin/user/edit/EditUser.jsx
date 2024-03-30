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
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { useUpdateUserMutation } from "@/slices/user.api.slice";

import { refetchUser } from "@/slices/fetch.slice";
import { useDispatch } from "react-redux";

const EditUser = ({ user, setOpenUpdate }) => {
  const { name, isAdmin } = user;

  const { toast } = useToast();
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: name,
      isAdmin: isAdmin,
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const result = await updateUser(data);

      if (!result.error) {
        toast({
          variant: "success",
          description: "User has been updated",
        });
        dispatch(refetchUser(true));
        setOpenUpdate(false);
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
  };

  return (
    <div>
      {user && (
        <>
          {/* {loadingProduct && (
            <DialogOverlay>
              <Loader2 className="m-auto size-10 animate-spin z-50" />
            </DialogOverlay>
          )} */}
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              {`Make changes to the product. Click save when you're done.`}
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

              {/* <div className="grid grid-cols-4 items-center gap-4">
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
              </div> */}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className=" animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </>
      )}
    </div>
  );
};
export default EditUser;

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { useUpdateUserProfileMutation } from "@/slices/user.api.slice";
import { setCredentials } from "@/slices/auth.slice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      name: userInfo.name || "",
      email: userInfo.email || "",
      password: "",
    },
  });

  const handleUpdate = async (data) => {
    try {
      const result = await updateUserProfile(data);
      console.log(result);
      if (!result.error) {
        toast({
          variant: "success",
          description: "Your profile has been updated",
        });
        dispatch(setCredentials({ ...result.data }));
        console.log(result.data);
      } else {
        toast({
          variant: "destructive",
          description: result.error?.data.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error?.data?.message,
      });
    }
  };

  const onSubmit = (data) => {
    handleUpdate(data);
  };

  return (
    <div>
      <Card className="w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="example@gmail.com"
                  className={errors.name ? "border-error" : null}
                />
                {/* {errors.name && (
                  <span className=" absolute top-14 right-0 text-error">
                    {errors.name.message}
                  </span>
                )} */}
              </div>
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="example@gmail.com"
                  className={errors.email ? "border-error" : null}
                />
                {/* {errors.email && (
                  <span className=" absolute top-14 right-0 text-error">
                    {errors.email.message}
                  </span>
                )} */}
              </div>
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="pwd"
                  type="password"
                  className={errors.password ? "border-error" : null}
                />
                {/* {errors.password && (
                  <span className=" absolute top-14 right-0 text-error">
                    {errors.password.message}
                  </span>
                )} */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfileScreen;

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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { useUpdateUserProfileMutation } from "@/slices/user.api.slice";
import { useGetMyOrdersQuery } from "@/slices/order.api.slice";
import { setCredentials } from "@/slices/auth.slice";
import { AlertCircle, CircleX, Loader2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {
    data: orders,
    isLoading: isLoadingOrder,
    error,
  } = useGetMyOrdersQuery();

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
      const result = await updateUserProfile({
        _id: userInfo._id,
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (!result.error) {
        toast({
          variant: "success",
          description: "Your profile has been updated",
        });
        dispatch(setCredentials({ ...result.data }));
        // console.log(result.data);
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
    <div className="flex gap-10">
      <Card className="min-w-[400px]">
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
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="confirm password">Confirm password</Label>
                <Input
                  {...register("confPassword", {
                    validate: (value, data) => {
                      if (value !== data.password) {
                        toast({
                          variant: "destructive",
                          description:
                            "The password and the confirm password fields must have the same value",
                        });
                        return "Passwords do not match";
                      }
                      return true;
                    },
                  })}
                  id="conf-pwd"
                  type="password"
                  className={errors.confPassword ? "border-error" : null}
                />
                {errors.confPassword && (
                  <span className=" absolute top-14 right-0 text-error">
                    {errors.confPassword.message}
                  </span>
                )}
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
      <div className="w-full">
        <p className="mb-4 font-bold h2">My orders</p>
        <Table>
          <TableCaption>
            {orders?.length === 0
              ? `You have no orders.`
              : `A list of all your orders.`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total (FCFA)</TableHead>
              <TableHead className="text-center">Paid</TableHead>
              <TableHead className="text-center">Delivered</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error?.data?.message || error.message}
                </AlertDescription>
              </Alert>
            )}
            {isLoadingOrder && <Spinner> Loading...</Spinner>}

            {orders?.length > 0 &&
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {order.createdAt.toString().substring(0, 10)}
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell className="text-center ">
                    {order.isPaid ? (
                      order.paidAt?.toString().substring(0, 10)
                    ) : (
                      <CircleX className="text-red-400" />
                    )}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    {order.isDelivered ? (
                      order.deliveredAt?.toString().substring(0, 10)
                    ) : (
                      <CircleX className="text-red-400" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="link">Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProfileScreen;

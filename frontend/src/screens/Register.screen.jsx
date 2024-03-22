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

import { useRegisterUserMutation } from "@/slices/user.api.slice";
import { setCredentials } from "@/slices/auth.slice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

function RegisterForm() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const search = useLocation();
  const sp = new URLSearchParams(search.search);
  const redirect = sp.get("redirect") || "/";

  const dispatch = useDispatch();

  // console.log(userInfo, redirect);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const { toast } = useToast();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async (data) => {
    const formData = { ...data };
    try {
      const result = await registerUser(formData);
      console.log(result);
      if (!result.error) {
        dispatch(setCredentials({ ...result.data }));

        navigate(redirect);
        // console.log(result.data);
        toast({
          variant: "success",
          description: "user registered successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.data.message,
      });
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    handleRegister(data);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  id="name"
                  placeholder="your Name"
                  className={errors.name ? "border-red-500 border-2 " : null}
                />
                {errors.name && (
                  <span className=" absolute top-14 right-0 text-[11px] font-semibold text-red-400">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: "Email is required" })}
                  id="email"
                  placeholder="example@gmail.com"
                  className={errors.email ? "border-error" : null}
                />
                {errors.email && (
                  <span className=" absolute top-14 right-0 text-error">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="pwd"
                  type="password"
                  className={errors.password ? "border-error" : null}
                />
                {errors.password && (
                  <span className=" absolute top-14 right-0 text-error">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("confpassword", {
                    required: "Password is required",
                    validate: (value, data) => {
                      if (value !== data.password) {
                        return "Passwords do not match";
                      }
                      return true;
                    },
                  })}
                  id="pwd-conf"
                  type="password"
                  className={
                    errors.confpassword
                      ? "border-error focus:outline-red-400"
                      : null
                  }
                />
                {errors.confpassword && (
                  <span className=" absolute top-14 right-0 text-error">
                    {errors.confpassword.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
          </CardFooter>
        </form>
        <CardFooter>
          Already have an account ?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            <Button variant="link">Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterForm;

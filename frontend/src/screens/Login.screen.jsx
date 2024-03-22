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

import { useLoginUserMutation } from "@/slices/user.api.slice";
import { setCredentials } from "@/slices/auth.slice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

function LoginForm() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const search = useLocation();
  const sp = new URLSearchParams(search.search);
  const redirect = sp.get("redirect") || "/";

  const dispatch = useDispatch();

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

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (data) => {
    const formData = { ...data };
    try {
      const result = await loginUser(formData);

      if (!result.error) {
        dispatch(setCredentials({ ...result.data }));
        navigate(redirect);

        toast({
          variant: "success",
          description: "user connected succesfully",
        });
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
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </CardFooter>
        </form>
        <CardFooter>
          New customer ?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <Button variant="link">Register</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;

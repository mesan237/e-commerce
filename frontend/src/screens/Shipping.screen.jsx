import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
// import { Loader2 } from "lucide-react";

import { saveShippingAddress } from "@/slices/cart.slice";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    defaultValues: {
      address: shippingAddress?.address || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      phone: shippingAddress?.phone || "",
    },
  });

  const handleCheckout = (data) => {
    dispatch(saveShippingAddress({ ...data }));
    navigate("/payment");
  };

  const onSubmit = (data) => {
    handleCheckout(data);
  };

  return (
    <>
      <h1 className="mb-4 font-bold h3 text-center">Shipping</h1>
      <div className="flex justify-center">
        <Card className="w-[400px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="relative flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    {...register("address", {
                      required: "address is required",
                    })}
                    id="address"
                    placeholder="your address"
                    className={
                      errors.address ? "border-red-500 border-2 " : null
                    }
                  />
                  {errors.address && (
                    <span className=" absolute top-14 right-0 text-[11px] font-semibold text-red-400">
                      {errors.address.message}
                    </span>
                  )}
                </div>
                <div className="relative flex flex-col space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register("city", { required: "city is required" })}
                    id="city"
                    placeholder="your city"
                    className={errors.city ? "border-red-500 border-2 " : null}
                  />
                  {errors.city && (
                    <span className=" absolute top-14 right-0 text-[11px] font-semibold text-red-400">
                      {errors.city.message}
                    </span>
                  )}
                </div>
                <div className="relative flex flex-col space-y-1.5">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    {...register("postalCode", {
                      required: "Postal code is required",
                    })}
                    id="postalCode"
                    placeholder="your postal code"
                    className={
                      errors.postalCode ? "border-red-500 border-2 " : null
                    }
                  />
                  {errors.postalCode && (
                    <span className=" absolute top-14 right-0 text-[11px] font-semibold text-red-400">
                      {errors.postalCode.message}
                    </span>
                  )}
                </div>
                <div className="relative flex flex-col space-y-1.5">
                  <Label htmlFor="phone number">Phone number</Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        className="number"
                        country={"cm"}
                        value={value}
                        onChange={onChange} // Use onChange from the Controller's field
                        id="phone"
                      />
                    )}
                  />
                  {errors.phone && (
                    <span className=" absolute top-14 right-0 text-[11px] font-semibold text-red-400">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">
                {/* {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                Continue
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ShippingScreen;

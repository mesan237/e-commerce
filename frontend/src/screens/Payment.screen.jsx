import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { savePaymentMethod } from "@/slices/cart.slice";
import { useEffect } from "react";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleCheckout = (data) => {
    dispatch(savePaymentMethod(data));
    navigate("/placeorder");
  };

  const onSubmit = (data) => {
    handleCheckout(data);
    console.log(data);
  };

  return (
    <div className="p-7 w-fit mx-auto ">
      <p className="mb-4 font-bold h3">Payment method</p>
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} className="w-fit space-y-6">
          <p className="h2">Select the method.</p>
          <RadioGroup
            defaultValue="paypal"
            {...register("paymentMethod", { required: true })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">Paypal or credit card</Label>
            </div>
          </RadioGroup>
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentScreen;

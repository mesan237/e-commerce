import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const Stepper = ({ step }) => {
  return (
    <>
      <div className="flex gap-2 items-center justify-center mb-6">
        <span
          className={`size-6 rounded-full text-white text-center ${
            step !== 1 ? " bg-slate-500 " : "bg-primary"
          }`}
        >
          1
        </span>
        <span className={step !== 1 ? " text-slate-500 " : "text-primary"}>
          {step >= 2 ? (
            <Link to="/cart" className="cursor-pointer">
              Cart
            </Link>
          ) : (
            "Cart"
          )}
        </span>
        <Separator className="w-20 space-x-2 bg-slate-400 h-0.5" />
        <span
          className={`size-6 rounded-full text-white text-center ${
            step !== 2 ? " bg-slate-500 " : "bg-primary"
          }`}
        >
          2
        </span>
        <span className={step !== 2 ? " text-slate-500 " : "text-primary"}>
          {step === 3 ? (
            <Link to="/checkout" className="cursor-pointer">
              Information
            </Link>
          ) : (
            "Information"
          )}
        </span>

        <Separator className="w-20 space-x-2 bg-slate-400 h-0.5" />
        <span
          className={`size-6 rounded-full text-white text-center ${
            step !== 3 ? " bg-slate-500 " : "bg-primary"
          }`}
        >
          3
        </span>
        <span className={step !== 3 ? " text-slate-500 " : "text-primary"}>
          place order
        </span>
      </div>
    </>
  );
};

export default Stepper;

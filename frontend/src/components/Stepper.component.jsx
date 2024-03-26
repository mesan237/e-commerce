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
          Sign in
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
          Shipping
        </span>
        <Separator
          className={`w-20 space-x-2 h-0.5 ${
            step !== 3 ? " bg-slate-400 " : "bg-primary"
          }`}
        />
        <span
          className={`size-6 rounded-full text-white text-center ${
            step !== 3 ? " bg-slate-500 " : "bg-primary"
          }`}
        >
          3
        </span>
        <span className={step !== 3 ? " text-slate-500 " : "text-primary"}>
          payment
        </span>
        <Separator className="w-20 space-x-2 bg-slate-400 h-0.5" />
        <span
          className={`size-6 rounded-full text-white text-center ${
            step !== 4 ? " bg-slate-500 " : "bg-primary"
          }`}
        >
          4
        </span>
        <span className={step !== 4 ? " text-slate-500 " : "text-primary"}>
          place order
        </span>
      </div>
    </>
  );
};

export default Stepper;

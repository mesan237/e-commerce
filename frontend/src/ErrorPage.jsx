import { Link, useRouteError } from "react-router-dom";
import errorLogo from "./assets/pageError.svg";
import { Button } from "./components/ui/button";

const ErrorPage = () => {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="h1 font-bold">Page not found</h1>
      <p className="h2">{`Sorry, we can't seem to find the page you are looking for!`}</p>
      <p>
        Please check out our
        <Link to="/">
          <Button variant="link" className="p-1 text-[16px]">
            home page
          </Button>
        </Link>
      </p>
      <img src={errorLogo} alt="error" className="size-1/2" />
    </div>
  );
};

export default ErrorPage;

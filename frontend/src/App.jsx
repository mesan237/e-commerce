import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="">
      <Header />
      <div className="padding">
        <p className="mb-10 font-bold size-[2rem]">Recent products </p>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

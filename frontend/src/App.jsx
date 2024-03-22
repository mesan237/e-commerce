import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="">
      <Header />
      <div className="padding">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

export default App;

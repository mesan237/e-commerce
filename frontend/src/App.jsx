import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Header />
      <div className="padding">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}

export default App;

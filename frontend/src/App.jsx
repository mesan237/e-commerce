import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="">
      <Header />
      <div className="padding">
        <h2 className="h2">Produits récents</h2>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

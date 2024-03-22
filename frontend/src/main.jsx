import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./screens/Home.screens.jsx";
import ProductScreen from "./screens/Product.screens.jsx";
import { store } from "./store.js";
import CartScreen from "./screens/Cart.screens.jsx";
import LoginForm from "./screens/Login.screen.jsx";
import RegisterForm from "./screens/Register.screen.jsx";
import ShippingScreen from "./screens/Shipping.screen.jsx";
import PrivateRoutes from "./components/PrivateRoutes.component.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "",
        element: <PrivateRoutes />,
        children: [
          {
            path: "/checkout",
            element: <ShippingScreen />,
          },
        ],
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/product/:productId",
        element: <ProductScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

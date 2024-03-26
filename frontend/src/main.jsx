import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { store } from "./store.js";

import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./screens/Home.screens.jsx";
import ProductScreen from "./screens/Product.screens.jsx";
import CartScreen from "./screens/Cart.screens.jsx";
import LoginForm from "./screens/Login.screen.jsx";
import RegisterForm from "./screens/Register.screen.jsx";
import ShippingScreen from "./screens/Shipping.screen.jsx";
import PrivateRoutes from "./components/PrivateRoutes.component.jsx";
import PaymentScreen from "./screens/Payment.screen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrder.screen.jsx";
import OrderScreen from "./screens/Order.screen.jsx";
import ProfileScreen from "./screens/Profile.screen.jsx";

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
          {
            path: "/payment",
            element: <PaymentScreen />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrderScreen />,
          },
          {
            path: "/order/:id",
            element: <OrderScreen />,
          },
          {
            path: "/profile",
            element: <ProfileScreen />,
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
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

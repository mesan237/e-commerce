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
import AdminRoutesComponent from "./components/AdminRoutes.component.jsx";
import OrderListScreen from "./screens/admin/OrderList.screen.jsx";
import AdminProductScreen from "./screens/admin/Page.server.compoent.jsx";
import UserListScreen from "./screens/admin/user/UserList.screen.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import HomeStatsScreen from "./screens/HomeStats.screen.jsx";

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
        path: "/page/:pageNumber",
        element: <Home />,
      },
      {
        path: "/search/:keyword",
        element: <Home />,
      },
      {
        path: "/search/:keyword/page/:pageNumber",
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
      // Admin routes
      {
        path: "",
        element: <AdminRoutesComponent />,
        children: [
          {
            path: "/admin",
            element: <Sidebar />,
            children: [
              {
                path: "/admin",
                element: <HomeStatsScreen />,
              },
              {
                path: "/admin/orderlist",
                element: <OrderListScreen />,
              },

              {
                path: "/admin/productlist",
                element: <AdminProductScreen />,
              },
              {
                path: "/admin/userlist",
                element: <UserListScreen />,
              },
            ],
          },
        ],
      },
      // {
      //   path: "",
      //   element: <AdminRoutesComponent />,
      //   children: [
      //     {
      //       path: "/admin/orderlist",
      //       element: <OrderListScreen />,
      //     },
      //     {
      //       path: "/admin/productlist",
      //       element: <AdminProductScreen />,
      //     },
      //     {
      //       path: "/admin/userlist",
      //       element: <UserListScreen />,
      //     },
      //   ],
      // },
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

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
  ListCollapse,
  ShoppingBag,
  Users,
  AlignJustify,
  Home,
} from "lucide-react";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex -m-8 max-h-[calc(100vh_-_2rem)] fixed bottom-0">
      <div
        className={` ${
          open ? "w-40 overflow-hidden" : "w-60 "
        } flex flex-col h-screen p-3 bg-accent-foreground shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white px-2">Dashboard</h2>
            <button onClick={() => setOpen(!open)}>
              <AlignJustify className="size-5 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link
                  to="/admin"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <Home className="size-5 text-white" />
                  <span className="text-gray-100">Home</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/admin/userlist"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <Users className="size-5 text-white" />
                  <span className="text-gray-100">Users</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/admin/orderlist"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <ShoppingBag className="size-5 text-white" />
                  <span className="text-gray-100">Orders</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/admin/productlist"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <ListCollapse className="size-5 text-white" />
                  <span className="text-gray-100">Products</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to=""
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-100">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 w-[calc(100vw_-_15rem)] mt-2">
        <Outlet />
      </div>
    </div>
  );
}

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationLinkBtnStyle,
} from "@/components/ui/navigation-menu";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useToast } from "./ui/use-toast";

import logo from "../assets/store.png";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";

import { logout } from "@/slices/auth.slice";
import { useLogoutMutation } from "@/slices/user.api.slice";
import {
  ListCollapse,
  LogOut,
  ShoppingBag,
  UserCog,
  Users,
  LayoutDashboard,
} from "lucide-react";
import SearchBox from "./SearchBox";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toast } = useToast();

  const [logoutApi] = useLogoutMutation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.auth);

  const log = async () => {
    if (userInfo) {
      const result = await logoutApi();
      if (result) {
        dispatch(logout());
        navigate("/login");
        toast({
          description: "You have been logged out",
          variant: "success",
        });
      }
      // console.log(result);
    }
  };
  // console.log(userInfo);

  return (
    <>
      <NavigationMenu className="mb-0 h-18 bg-slate-400 sticky top-0 border-b border-gray-200  backdrop-blur-lg bg-opacity-30">
        <NavigationMenuList className="w-screen flex py-1 m-0 px-8">
          <NavigationMenuItem className=" flex items-center gap-2 w-full">
            <NavigationMenuLink className="mr-auto">
              <img src={logo} alt="iot shop" className="w-14 h-14" />
            </NavigationMenuLink>

            <SearchBox />
            <Link to="/cart">
              <NavigationMenuLink
                className={`gap-1 items-center ${navigationLinkBtnStyle()}`}
              >
                <FaCartShopping className="text-slate-500" />
                Cart
                {cartItems.length > 0 && (
                  <Badge variant="notification">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </NavigationMenuLink>
            </Link>

            {/* Whiy does this className works ? */}
            {userInfo ? (
              <NavigationMenu>
                <NavigationMenuLink>
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navigationLinkBtnStyle()}>
                      <NavigationMenuTrigger className="gap-2">
                        <FaUser className="text-slate-500" />

                        {userInfo.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[100px] gap-3 p-4 md:w-[120px] lg:w-[150px]">
                          <Link
                            to="/profile"
                            className="flex justify-between align-baseline"
                          >
                            Profile
                            <UserCog className="size-4" />
                          </Link>
                          <Link
                            onClick={() => log()}
                            className="flex justify-between align-baseline"
                          >
                            Log out
                            <LogOut className="size-4" />
                          </Link>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuLink>
              </NavigationMenu>
            ) : (
              <Link to="/login" className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75"></div>
                <NavigationMenuLink
                  className={`gap-2 relative bg-white ${navigationLinkBtnStyle()}`}
                >
                  <FaUser className="text-slate-500" />
                  Sign in
                </NavigationMenuLink>
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <Link to="/admin" className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75"></div>
                <NavigationMenuLink
                  className={`gap-2 relative bg-white ${navigationLinkBtnStyle()}`}
                >
                  <LayoutDashboard className="text-slate-500" />
                  Dashboard
                </NavigationMenuLink>
              </Link>
              // <NavigationMenu>
              //   <NavigationMenuLink>
              //     <NavigationMenuItem>
              //       <NavigationMenuLink className={navigationLinkBtnStyle()}>
              //         <NavigationMenuTrigger className="gap-2">
              //           {/* <FaUser className="text-slate-500" /> */}
              //           Admin
              //         </NavigationMenuTrigger>
              //         <NavigationMenuContent>
              //           <ul className="grid w-[100px] gap-3 p-4 md:w-[120px] lg:w-[150px]">
              //             <Link
              //               to="/admin/orderlist"
              //               className="flex justify-between align-baseline"
              //             >
              //               Orders
              //               <ShoppingBag color="#66aee5" className="size-4" />
              //             </Link>
              //             <Link
              //               to="/admin/userlist"
              //               className="flex justify-between align-baseline"
              //             >
              //               Users
              //               <Users color="#66aee5" className="size-4" />
              //             </Link>
              //             <Link
              //               to="/admin/productlist"
              //               className="flex justify-between align-baseline"
              //             >
              //               Products
              //               <ListCollapse color="#66aee5" className="size-4" />
              //             </Link>
              //           </ul>
              //         </NavigationMenuContent>
              //       </NavigationMenuLink>
              //     </NavigationMenuItem>
              //   </NavigationMenuLink>
              // </NavigationMenu>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Header;

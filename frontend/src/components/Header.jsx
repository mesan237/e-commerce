import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationLinkBtnStyle,
} from "@/components/ui/navigation-menu";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

import logo from "../assets/store.png";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  // console.log(cartItems.length, cartItems[0]);
  return (
    <>
      <NavigationMenu className="">
        <NavigationMenuList className="w-screen flex px-4 py-1 m-0 bg-slate-200">
          <NavigationMenuItem className=" flex items-center gap-2 w-full">
            <NavigationMenuLink className="mr-auto">
              <img src={logo} alt="iot shop" className="w-20 h-20" />
            </NavigationMenuLink>

            <Link to="/cart">
              <NavigationMenuLink
                className={`gap-1 items-center ${navigationLinkBtnStyle()}`}
              >
                <FaCartShopping className="text-slate-500" />
                Cart
                {cartItems.length > 0 && (
                  <Badge variant="notification">{cartItems.length}</Badge>
                )}
              </NavigationMenuLink>
            </Link>

            {/* Whiy does this className works ? */}

            <Link to="/login">
              <NavigationMenuLink
                className={`gap-2 ${navigationLinkBtnStyle()}`}
              >
                <FaUser className="text-slate-500" />
                Sign in
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Header;

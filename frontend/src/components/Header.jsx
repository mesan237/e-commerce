import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationLinkBtnStyle,
} from "@/components/ui/navigation-menu";
import { FaUser, FaCartShopping } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      <NavigationMenu className="">
        <NavigationMenuList className="w-screen flex justify-start   p-4 m-0 bg-slate-200">
          <NavigationMenuItem className=" flex items-baseline gap-4 w-full">
            <NavigationMenuLink className="mr-auto h1">
              IOTSTORE
            </NavigationMenuLink>
            <NavigationMenuLink className={`gap-2 ${navigationLinkBtnStyle()}`}>
              <FaCartShopping className="text-slate-500" />
              Cart
            </NavigationMenuLink>
            {/* Whiy does this className works ? */}
            <NavigationMenuLink className={`gap-2 ${navigationLinkBtnStyle()}`}>
              <FaUser className="text-slate-500" />
              Sign in
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Header;

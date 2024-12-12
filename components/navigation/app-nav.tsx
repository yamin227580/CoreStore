import { auth } from "@/server/auth";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "../cart/cart-drawer";
import NavLogo from "./nav-logo";
import UserButton from "./user-button";

const AppNav = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-between py-4">
      <NavLogo />
      <div className="flex items-center gap-4 cursor-pointer">
        <CartDrawer>
          <div className="relative">
            <ShoppingCart size={24} strokeWidth="3" />
            <span className="absolute top-[-8px] right-[-8px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-white rounded-full">
              1
            </span>
          </div>
        </CartDrawer>
        <UserButton user={session?.user!} expires={session?.expires!} />
      </div>
    </div>
  );
};
export default AppNav;

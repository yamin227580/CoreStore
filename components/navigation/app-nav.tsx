import { auth } from "@/server/auth";
import CartBtn from "../cart/cart-btn";
import NavLogo from "./nav-logo";
import UserButton from "./user-button";

const AppNav = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between py-4">
      <NavLogo />
      <div className="flex items-center gap-4 cursor-pointer">
        <CartBtn user={session?.user?.email || ""} />
        <UserButton user={session?.user!} expires={session?.expires!} />
      </div>
    </div>
  );
};
export default AppNav;

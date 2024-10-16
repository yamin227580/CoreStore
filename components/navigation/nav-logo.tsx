import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

const NavLogo = async () => {
  return (
    <div>
      <Link href={"/"} className="text-2xl font-bold text-primary">
        <ShoppingBasket size={43} />
      </Link>
    </div>
  );
};
export default NavLogo;

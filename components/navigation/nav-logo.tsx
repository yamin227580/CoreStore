import { Apple } from "lucide-react";
import Link from "next/link";

const NavLogo = async () => {
  return (
    <div>
      <Link href={"/"} className=" font-bold font-mono flex gap-1">
        <Apple size={43} className="fill-primary" />
        <span className="text-5xl">iCore</span>
      </Link>
    </div>
  );
};
export default NavLogo;

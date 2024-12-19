"use client";
import { LogIn, LogOut, Settings, Truck } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserButton = ({ user }: Session) => {
  const router = useRouter();
  return (
    <div>
      {user?.email ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="ring-0">
            <Avatar>
              <AvatarImage src={user.image!} />
              <AvatarFallback className="bg-primary text-white font-bold">
                {user.name?.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-4">
            <div className="flex items-center gap-2 p-4 rounded-lg border-2 border-black/10 mb-4 cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out">
              <Avatar>
                <AvatarImage src={user.image!} />
                <AvatarFallback className="bg-primary text-white font-bold">
                  {user.name?.slice(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-bold">{user.name}</h3>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer group"
              onClick={() => router.push("/dashboard/orders")}
            >
              <Truck className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:text-primary transition-all duration-300 ease-in-out" />
              <span className="text-sm font-medium">My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group hover:bg-primary/10"
              onClick={() => router.push("/dashboard/settings")}
            >
              <Settings className="w-5 h-5 mr-3 group-hover:rotate-180 group-hover:text-primary transition-all duration-300 ease-in-out" />
              <span className="text-sm font-medium">Setting</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group"
              onClick={() => signOut()}
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:scale-90  group-hover:text-red-600 transition-all duration-300 ease-in-out " />
              <span className="text-sm font-medium group-hover:text-red-600 duration-300 ease-in-out">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href={"/auth/login"} className="space-x-4">
            <LogIn size={17} />
            <span>Login</span>
          </Link>
        </Button>
      )}
    </div>
  );
};
export default UserButton;

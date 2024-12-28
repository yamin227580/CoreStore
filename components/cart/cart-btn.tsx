"use client";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./cart-drawer";

type CartBtnProps = {
  user: string;
};

const CartBtn = ({ user }: CartBtnProps) => {
  const cartLenght = useCartStore((state) => state.cart.length);
  return (
    <CartDrawer user={user}>
      <div className="relative">
        <ShoppingCart size={24} strokeWidth="3" />
        <span className="absolute top-[-8px] right-[-8px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-white rounded-full">
          {cartLenght}
        </span>
      </div>
    </CartDrawer>
  );
};
export default CartBtn;

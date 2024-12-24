import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCartStore } from "@/store/cart-store";
import React from "react";
import CartItem from "./cart-item";
import CartStatus from "./cart-status";
import Payment from "./payment";
import Success from "./success";

type CartDrawerProps = {
  children: React.ReactNode;
};

const CartDrawer = ({ children }: CartDrawerProps) => {
  const cartPosition = useCartStore((state) => state.cartPosition);
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Your Cart</DrawerTitle>
          <DrawerDescription className="text-center mb-10">
            Thanks for shopping with icore
          </DrawerDescription>
          <CartStatus />
        </DrawerHeader>
        {cartPosition === "Order" && <CartItem />}
        {cartPosition === "Checkout" && <Payment />}
        {cartPosition === "Success" && <Success />}
      </DrawerContent>
    </Drawer>
  );
};
export default CartDrawer;

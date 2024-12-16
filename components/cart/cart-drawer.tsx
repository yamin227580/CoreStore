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
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>Stay home.Stay safe</DrawerDescription>
          <CartStatus />
        </DrawerHeader>
        {cartPosition === "Order" && <CartItem />}
        {cartPosition === "Checkout" && <p>I am a Checkout element</p>}
      </DrawerContent>
    </Drawer>
  );
};
export default CartDrawer;

"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCartStore } from "@/store/cart-store";
import React, { useState } from "react";
import CartItem from "./cart-item";
import CartStatus from "./cart-status";
import Payment from "./payment";
import Success from "./success";

type CartDrawerProps = {
  children: React.ReactNode;
  user: string;
};

const CartDrawer = ({ children, user }: CartDrawerProps) => {
  const cartPosition = useCartStore((state) => state.cartPosition);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Your Cart</DrawerTitle>
          <DrawerDescription className="text-center mb-10">
            Thanks for shopping with icore
          </DrawerDescription>
          <CartStatus />
        </DrawerHeader>
        {cartPosition === "Order" && (
          <CartItem user={user} setIsOpen={setIsOpen} />
        )}
        {cartPosition === "Checkout" && <Payment />}
        {cartPosition === "Success" && <Success />}
      </DrawerContent>
    </Drawer>
  );
};
export default CartDrawer;

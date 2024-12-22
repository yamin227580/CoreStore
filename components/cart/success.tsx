"use client";
import { useCartStore } from "@/store/cart-store";
import { PartyPopper } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../ui/button";

const Success = () => {
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const cart = useCartStore((state) => state.cart);
  useEffect(() => {
    setTimeout(() => {
      setCartPosition("Order");
    }, 3000);
    // if (cart.length === 0) setCartPosition("Order");
  }, []);
  return (
    <main className="max-w-4xl my-10 mx-auto text-center">
      <PartyPopper size={40} className="mx-auto animate-bounce" />
      <h2 className="text-4xl font-bold my-4">Your payment was successful</h2>
      <p className="text-sm font-medium text-muted-foreground mb-4">
        Thank you for your purchase
      </p>
      <Button className="mx-auto">
        <Link href={"/dashboard/orders"}>View your order</Link>
      </Button>
    </main>
  );
};
export default Success;

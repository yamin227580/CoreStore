"use client";
import stripeInit from "@/lib/stripe-init";
import { totalPriceCalc } from "@/lib/total-price";
import { useCartStore } from "@/store/cart-store";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import PaymentForm from "./payment-form";

const stripe = stripeInit();

const Payment = () => {
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const cart = useCartStore((state) => state.cart);
  useEffect(() => {
    if (cart.length === 0) setCartPosition("Order");
  }, []);
  return (
    <div>
      <Elements
        stripe={stripe}
        options={{
          mode: "payment",
          currency: "usd",
          amount: totalPriceCalc(cart),
        }}
      >
        <PaymentForm totalPrice={totalPriceCalc(cart)} />
      </Elements>
    </div>
  );
};
export default Payment;

"use client";
import { createOrder } from "@/server/actions/order";
import { processPayment } from "@/server/actions/payment";
import { useCartStore } from "@/store/cart-store";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useAction } from "next-safe-action/hooks";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type PayemntFormProps = {
  totalPrice: number;
};
const PaymentForm = ({ totalPrice }: PayemntFormProps) => {
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { execute } = useAction(createOrder, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        setCartPosition("Success");
        clearCart();
      }
    },
  });
  const onSubmitHandler = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      setErrorMsg(submitError.message || "Something went wrong");
      return;
    }
    const response = await processPayment({
      amount: totalPrice * 100,
      currency: "usd",
      cart: cart.map((item) => ({
        quantity: item.variant.quantity,
        productId: item.id,
        title: item.name,
        image: item.image,
        price: Number(item.price),
      })),
    });
    if (response?.data?.error) {
      setErrorMsg(response.data.error);
      setLoading(false);
      return;
    }
    if (response?.data?.success) {
      //records on stripe dashboard
      //confirmPayment completes and finalizes the payment
      const paymentResponse = await stripe.confirmPayment({
        elements, //card information
        clientSecret: response.data.success.clientSecretId!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: response.data.success.user_email!,
        },
      });
      if (paymentResponse.error) {
        setErrorMsg(paymentResponse.error.message!);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        setCartPosition("Success");
        clearCart();
        execute({
          paymentId: response.data.success.paymentIntentId,
          totalPrice,
          status: "pending",
          products: cart.map((item) => ({
            productId: item.id,
            quantity: item.variant.quantity,
            variantId: item.variant.variantId,
          })),
        });
      }
    }
  };
  return (
    <main className="max-w-4xl mx-auto">
      <form onSubmit={onSubmitHandler}>
        <PaymentElement />
        <Button
          disabled={loading || !stripe || !elements}
          className="w-full my-4"
        >
          Pay
        </Button>
      </form>
    </main>
  );
};
export default PaymentForm;

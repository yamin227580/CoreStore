"use server";
import { paymentSchema } from "@/types/payment-schema";
import Stripe from "stripe";
import { auth } from "../auth";
import { actionClient } from "./safe-action";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const processPayment = actionClient
  .schema(paymentSchema)
  .action(async ({ parsedInput: { amount, cart, currency } }) => {
    const user = await auth();
    if (!user) {
      return { error: "You need to be logged" };
    }
    if (!amount) {
      return { error: "No product in cart" };
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    });
    return {
      success: {
        paymentIntentId: paymentIntent.id,
        clientSecretId: paymentIntent.client_secret,
        user_email: user.user.email,
      },
    };
  });

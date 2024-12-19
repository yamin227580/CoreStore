"use server";
import { createOrderSchema } from "@/types/order-schema";
import { db } from "..";
import { auth } from "../auth";
import { orderProduct, orders } from "../schema";
import { actionClient } from "./safe-action";

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(
    async ({ parsedInput: { totalPrice, status, paymentId, products } }) => {
      const session = await auth();
      if (!session) return { error: "You need to be logged in" };
      const order = await db
        .insert(orders)
        .values({
          total: totalPrice,
          status,
          userID: session.user.id,
        })
        .returning();
      products.map(async ({ productId, variantId, quantity }) => {
        await db.insert(orderProduct).values({
          productID: productId,
          productVariantID: variantId,
          quantity,
          orderID: order[0].id,
        });
      });
      return { success: "order added" };
    }
  );

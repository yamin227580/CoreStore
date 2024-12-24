"use server";
import { createOrderSchema, updateOrderSchema } from "@/types/order-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
      revalidatePath("/dashboard/orders");
      return { success: "order added" };
    }
  );

export const updateOrderStatus = actionClient
  .schema(updateOrderSchema)
  .action(async ({ parsedInput: { status, id } }) => {
    const order = await db.query.orders.findFirst({ where: eq(orders.id, id) });
    if (!order) {
      return { error: "Order not found" };
    }
    await db.update(orders).set({ status }).where(eq(orders.id, id));
    revalidatePath("/dashboard/orders");
    return { success: "Order status updated." };
  });

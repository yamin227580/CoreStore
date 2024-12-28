"use server";
import { ProductSchema } from "@/types/product-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "..";
import { products } from "../schema";
import { actionClient } from "./safe-action";

export const updateProduct = actionClient
  .schema(ProductSchema)
  .action(async ({ parsedInput: { id, title, description, price } }) => {
    console.log("products", title, description, price);
    try {
      //update proudct
      if (id) {
        const existingProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });
        if (!existingProduct) {
          return { error: "Product not found" };
        }
        await db
          .update(products)
          .set({ title, description, price })
          .where(eq(products.id, id));

        revalidatePath("/dashboard/products");
        revalidatePath("/");
        return { success: `${title} updated successfully` };
      } else {
        //create product
        const product = await db
          .insert(products)
          .values({ title, description, price })
          .returning();

        revalidatePath("/dashboard/products");
        revalidatePath("/");
        return { success: `${product[0].title} created successfully` };
      }
    } catch (error) {
      return { error: "Something went wrong" };
    }
  });

export const getSingleProduct = async (id: number) => {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    });
    if (!product) return { error: "Product not found" };
    return { success: product };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

const deleteProductSchema = z.object({
  id: z.number(),
});

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.delete(products).where(eq(products.id, id));
      revalidatePath("/dashboard/products");
      return { success: "Product deleted successfully" };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  });

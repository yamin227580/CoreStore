"use server";

import { VariantSchema } from "@/types/variant-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "..";
import {
  products,
  productVariants,
  variantImages,
  variantTags,
} from "../schema";
import { actionClient } from "./safe-action";

export const createVariant = actionClient
  .schema(VariantSchema)
  .action(
    async ({
      parsedInput: {
        id,
        editMode,
        productId,
        color,
        productType,
        tags,
        variantImages: vImg,
      },
    }) => {
      try {
        if (editMode && id) {
          const editVariant = await db
            .update(productVariants)
            .set({ color, productType, updated: new Date() })
            .where(eq(productVariants.id, id))
            .returning();
          await db
            .delete(variantTags)
            .where(eq(variantTags.variantId, editVariant[0].id));
          await db.insert(variantTags).values(
            tags.map((t) => {
              return {
                tag: t,
                variantId: editVariant[0].id,
              };
            })
          );
          await db
            .delete(variantImages)
            .where(eq(variantImages.variantId, editVariant[0].id));
          await db.insert(variantImages).values(
            vImg.map((image, index) => {
              return {
                name: image.name,
                image_url: image.url,
                size: image.size.toString(),
                order: index,
                variantId: editVariant[0].id,
              };
            })
          );
          revalidatePath("/dashboard/products");
          return { success: "updated variant" };
        }
        if (!editMode) {
          const variant = await db
            .insert(productVariants)
            .values({ color, productId, productType })
            .returning();
          const product = await db.query.products.findFirst({
            where: eq(products.id, productId),
          });
          await db.insert(variantTags).values(
            tags.map((t) => {
              return {
                tag: t,
                variantId: variant[0].id,
              };
            })
          );
          await db.insert(variantImages).values(
            vImg.map((image, index) => {
              return {
                name: image.name,
                image_url: image.url,
                size: image.size.toString(),
                order: index,
                variantId: variant[0].id,
              };
            })
          );
          revalidatePath("/dashboard/products");
          return { success: `${product?.title}'s variant added` };
        }
      } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
      }
    }
  );

export const deleteVariant = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      //corresponding varirant tags and images will delete automatically because of cascade delete in schema
      await db.delete(productVariants).where(eq(productVariants.id, id));
      revalidatePath("/dashboard/products");
      return { success: "deleted variant successfully" };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong" };
    }
  });

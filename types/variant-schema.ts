import * as z from "zod";

export const VariantSchema = z.object({
  productId: z.number(),
  id: z.number(),
  editMode: z.boolean(),
  color: z.string().min(3, { message: "Please enter at least 3 characters" }),
  tags: z.array(
    z.string().min(3, { message: "Please enter at least 3 characters" })
  ),
  productType: z
    .string()
    .min(3, { message: "Please enter at least 3 characters" }),
  variantImages: z.array(
    z.object({
      url: z.string().url({ message: "Please enter a valid url" }),
      size: z.number(),
      key: z.string().optional(),
      id: z.number().optional(),
      name: z.string(),
    })
  ),
});

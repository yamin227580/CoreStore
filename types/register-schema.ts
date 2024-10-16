import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter at least 4 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

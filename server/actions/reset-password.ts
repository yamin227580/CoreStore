"use server";
import { resetPasswordSchema } from "@/types/reset-password-schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { sendPasswordResetEmail } from "./emails";
import { actionClient } from "./safe-action";
import { generateResetPasswordToken } from "./tokens";

export const resetPassword = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) return { error: "Email not found" };
    const passwordResetToken = await generateResetPasswordToken(email);
    if (!passwordResetToken) {
      return { error: "fail to generate password reset token" };
    }
    await sendPasswordResetEmail(
      passwordResetToken[0].email,
      passwordResetToken[0].token
    );
    return { success: "Password reset email sents" };
  });

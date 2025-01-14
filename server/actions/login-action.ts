"use server";
import { loginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { db } from "..";
import { signIn } from "../auth";
import { twoFactorTokens, users } from "../schema";
import { sendEmail, sendTwoFactorEmail } from "./emails";
import { actionClient } from "./safe-action";
import {
  generateEmailVerificationToken,
  generateTwoFactorCode,
  getTwoFactorCodeByEmail,
} from "./tokens";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existingUser?.email !== email) {
        return { error: "Please provide valid credentials" };
      }
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          existingUser.name!.slice(0, 5)
        );
        return { success: "Email verification resent" };
      }
      if (existingUser.isTwoFactorEnabled) {
        if (code) {
          const twoFactorCode = await getTwoFactorCodeByEmail(
            existingUser.email
          );
          if (!twoFactorCode) {
            return { twoFactor: "Invalid code" };
          }
          if (code !== twoFactorCode.token) {
            return { twoFactor: "Invalid code" };
          }
          const isExpired = new Date(twoFactorCode.expires) < new Date();
          if (isExpired) {
            return { twoFactor: "Expired code" };
          }
          await db
            .delete(twoFactorTokens)
            .where(eq(twoFactorTokens.id, twoFactorCode.id));
        } else {
          const twoFactorCode = await generateTwoFactorCode(existingUser.email);
          if (!twoFactorCode) {
            return { twoFactor: "Failed to generate two factor code" };
          }
          await sendTwoFactorEmail(
            twoFactorCode[0].email,
            twoFactorCode[0].token
          );
          return { twoFactor: "Two Factor code sent." };
        }
      }
      await signIn("credentials", { email, password, redirectTo: "/" });
      return { success: "Login success" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Please provide valid credentials" };
          case "OAuthSignInError":
            return { error: error.message };
        }
      }
      throw error;
    }
  });

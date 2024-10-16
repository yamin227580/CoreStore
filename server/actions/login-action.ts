"use server";
import { loginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { db } from "..";
import { signIn } from "../auth";
import { users } from "../schema";
import { sendEmail } from "./emails";
import { actionClient } from "./safe-action";
import { generateEmailVerificationToken } from "./tokens";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
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

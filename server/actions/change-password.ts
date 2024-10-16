"use server";
import { changePasswordSchema } from "@/types/change-password-schema";
import { Pool } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { db } from "..";
import { resetPasswordToken, users } from "../schema";
import { actionClient } from "./safe-action";
import { checkPasswordResetTokenByToken } from "./tokens";

export const changePassword = actionClient
  .schema(changePasswordSchema)
  .action(async ({ parsedInput: { password, token } }) => {
    const pool = new Pool({
      connectionString: process.env.DRIZZLE_DATABASE_URL,
    });
    const dbPool = drizzle(pool);
    if (!token) {
      return { error: "Missing token" };
    }
    const existingToken = await checkPasswordResetTokenByToken(token);
    if (!existingToken) {
      return { error: "Invalid token" };
    }
    const isExpired = new Date() > new Date(existingToken.expires);
    if (isExpired) {
      return { error: "Expired token. Try again" };
    }
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });
    if (!existingUser) {
      return { error: "User not found" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbPool.transaction(async (context) => {
      await context
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, existingUser.id));
      await context
        .delete(resetPasswordToken)
        .where(eq(resetPasswordToken.id, existingToken.id));
    });
    return { success: "Password changed" };
  });

"use server";
import { registerSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { sendEmail } from "./emails";
import { actionClient } from "./safe-action";
import { generateEmailVerificationToken } from "./tokens";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const hashPassword = await bcrypt.hash(password, 10);
    //check user exist
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser) {
      if (!existingUser.emailVerified) {
        //generate token
        const verificationToken = await generateEmailVerificationToken(email);
        // Send verification email
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          name.slice(0, 5)
        );
        return { success: "Email verification resent" };
      }
      return { error: "Email already exists" };
    }
    // create new user
    await db.insert(users).values({ name, email, password: hashPassword });
    //generate email verification token
    const verificationToken = await generateEmailVerificationToken(email);
    // sent verification email
    await sendEmail(
      verificationToken[0].email,
      verificationToken[0].token,
      name.slice(0, 5)
    );
    return { success: "Email verification sent" };
  });

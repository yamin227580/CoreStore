"use server";
import EmailConfirmationTemplate from "@/components/email-template";
import ResetPasswordEmail from "@/components/password-reset-email-template";
import { getBaseUrl } from "@/lib/get-baseUrl";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const currentBaseUrl = getBaseUrl();

export const sendEmail = async (
  email: string,
  token: string,
  userFirstname: string
) => {
  const confirmLink = `${currentBaseUrl}/email-confirmation?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Account - my project",
    react: EmailConfirmationTemplate({
      userFirstname,
      confirmEmailLink: confirmLink,
    }),
  });
  if (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${currentBaseUrl}/change-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password - Alert from my project",
    react: ResetPasswordEmail({
      resetPasswordLink: resetLink,
    }),
  });

  if (error) {
    console.log(error);
  }
};

"use client";
import { cn } from "@/lib/utils";
import { confirmEmailWithToken } from "@/server/actions/tokens";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AuthForm from "./auth-form";

const ConfirmEmail = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleConfirmEmail = useCallback(async () => {
    if (!token) {
      setError("Invalid token");
      return;
    }
    confirmEmailWithToken(token).then((res) => {
      if (res.success) {
        setSuccess(res.success);
        router.push("/auth/login");
      }
      if (res.error) {
        setError(res.error);
      }
    });
  }, []);

  useEffect(() => {
    handleConfirmEmail();
  }, []);

  return (
    <AuthForm
      formTitle="Confirm Email"
      footerLabel="Login to your account"
      footerHref="/auth/login"
      showProvider={false}
    >
      <p
        className={cn(
          "text-center font-bold text-primary text-xl",
          error && "text-red-600"
        )}
      >
        {!success && !error ? "Confirming email..." : success ? success : error}
      </p>
    </AuthForm>
  );
};
export default ConfirmEmail;

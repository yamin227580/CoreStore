"use client";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/server/actions/reset-password";
import { resetPasswordSchema } from "@/types/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import SettingCard from "./setting-card";

type ChangePasswordProps = {
  email: string;
};
const ChangePassword = ({ email }: ChangePasswordProps) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email ? email : "",
    },
  });
  const { execute, result, status } = useAction(resetPassword, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data?.success, {
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
      }
      if (data?.error) {
        toast.error(data?.error);
      }
    },
  });
  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    const { email } = values;
    execute({ email });
  };
  return (
    <SettingCard>
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Change Password</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button
              className={cn(
                "w-full my-4",
                status === "executing" && "animate-pulse"
              )}
              disabled={status === "executing"}
            >
              <KeyRound className="w-5 h-5 cursor-pointer" />
            </Button>
          </form>
        </Form>
      </div>
    </SettingCard>
  );
};
export default ChangePassword;

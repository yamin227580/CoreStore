"use client";
import AuthForm from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/server/actions/reset-password";
import { resetPasswordSchema } from "@/types/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const ResetPassword = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { execute, result, status } = useAction(resetPassword, {
    onSuccess({ data }) {
      form.reset();
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
    <AuthForm
      formTitle="Reset Password"
      footerLabel="Already have an account?"
      footerHref="/auth/login"
      showProvider={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className={cn(
              "w-full my-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};
export default ResetPassword;

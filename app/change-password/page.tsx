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
import { changePassword } from "@/server/actions/change-password";
import { changePasswordSchema } from "@/types/change-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const ChangePassword = () => {
  const token = useSearchParams().get("token");
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const { execute, result, status } = useAction(changePassword, {
    onSuccess({ data }) {
      form.reset();
      if (data?.success) {
        signOut({ callbackUrl: "/auth/login" });
        toast.success(data?.success);
      }
      if (data?.error) {
        toast.error(data?.error);
      }
    },
  });
  const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    const { password } = values;
    execute({ password, token });
  };
  return (
    <AuthForm
      formTitle="Change Password"
      footerLabel="Already have an account?"
      footerHref="/auth/login"
      showProvider={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="****"
                      type="password"
                      {...field}
                      disabled={status === "executing"}
                    />
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
            Change Password
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};
export default ChangePassword;

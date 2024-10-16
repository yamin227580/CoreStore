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
import { register } from "@/server/actions/register-action";
import { registerSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { execute, result, status } = useAction(register, {
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
      } else {
        toast.error(data?.error);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const { name, email, password } = values;
    execute({ name, email, password });
  };

  return (
    <AuthForm
      formTitle="Register new account"
      showProvider
      footerLabel="Already have an account?"
      footerHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="abc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} type="password" />
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
            Register
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};
export default Register;

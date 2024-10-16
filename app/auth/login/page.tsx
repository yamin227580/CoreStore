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
import { login } from "@/server/actions/login-action";
import { loginSchema } from "@/types/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, result, status } = useAction(login, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data.error);
      }
      // if (data?.success) {
      //   toast.success(data?.success);
      // } else {
      //   toast.error(data?.error);
      // }
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    execute({ email, password });
  };

  return (
    <AuthForm
      formTitle="Login to your account"
      showProvider={true}
      footerLabel="Don't have an account?"
      footerHref="/auth/register"
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
                    <Input placeholder="test@gmail.com" {...field} />
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
            <Button size={"sm"} variant={"link"} className="pl-0 mb-1">
              <Link href={"/auth/reset"}>Forgot password?</Link>
            </Button>
          </div>
          <Button
            className={cn(
              "w-full mb-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};
export default Login;

"use client";
import { cn } from "@/lib/utils";
import { twoFactorToogler } from "@/server/actions/settings";
import { twoFactorSchema } from "@/types/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import SettingCard from "./setting-card";

type TwoFactorProps = {
  isTwoFactorEnabled: boolean;
  email: string;
};
const TwoFactor = ({ isTwoFactorEnabled, email }: TwoFactorProps) => {
  const form = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      isTwoFactorEnabled,
      email,
    },
  });
  const { execute, status, result } = useAction(twoFactorToogler, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.success);
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });
  const onSubmit = (values: z.infer<typeof twoFactorSchema>) => {
    const { isTwoFactorEnabled, email } = values;
    execute({ isTwoFactorEnabled, email });
  };
  return (
    <SettingCard>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="isTwoFactorEnabled"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>
                  {isTwoFactorEnabled ? "Disable" : "Enable"} two factor
                  authentication for your account
                </FormDescription>
                <FormControl>
                  <Switch
                    disabled={status === "executing"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className={cn(
              "w-full mb-4 mt-2",
              status === "executing" && "animate-pulse",
              isTwoFactorEnabled ? "bg-red-400 hover:bg-red-600" : "bg-primary"
            )}
            disabled={status === "executing"}
          >
            {isTwoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </form>
      </Form>
    </SettingCard>
  );
};
export default TwoFactor;

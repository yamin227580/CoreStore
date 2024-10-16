"use client";
import { cn } from "@/lib/utils";
import { updateDisplayName } from "@/server/actions/settings";
import { settingsSchema } from "@/types/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type ProfileFormProps = {
  name: string;
  email: string;
  setIsOpen: (value: boolean) => void;
};
const ProfileForm = ({ name, email, setIsOpen }: ProfileFormProps) => {
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const { execute, result, status } = useAction(updateDisplayName, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
        setIsOpen(false);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    const { name, email } = values;
    execute({ name, email });
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 lg:px-0">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className={cn(
              "w-full mt-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Save
          </Button>
        </form>
      </Form>
    </main>
  );
};
export default ProfileForm;

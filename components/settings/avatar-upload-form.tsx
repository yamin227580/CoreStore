import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import { profileAvatarUpdate } from "@/server/actions/settings";
import { avatarSchema } from "@/types/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type AvatarUploadFormProps = {
  image: string;
  name: string;
  email: string;
};
const AvatarUploadForm = ({ image, name, email }: AvatarUploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image,
      email,
    },
  });
  const { execute, status, result } = useAction(profileAvatarUpdate, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.success);
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });
  const onSubmit = (values: z.infer<typeof avatarSchema>) => {
    const { image, email } = values;
    execute({ image, email });
  };
  useEffect(() => {
    form.setValue("image", image);
  }, [image, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center flex-col">
                <Avatar className="w-14 h-14">
                  {form.getValues("image") && (
                    <AvatarImage src={form.getValues("image") || image} />
                  )}
                  {!form.getValues("image") && (
                    <AvatarFallback className="bg-primary text-white font-bold">
                      {name.slice(0, 2).toLocaleUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <UploadButton
                  className="scale-75 ut-button:bg-primary ut-label:text-red-500 hover:ut-button:ring-primary ut-button:ring-primary"
                  endpoint="imageUploader"
                  onUploadBegin={() => {
                    setIsUploading(true);
                  }}
                  onUploadError={(error) => {
                    form.setError("image", {
                      type: "validate",
                      message: error.message,
                    });
                    setIsUploading(false);
                    return;
                  }}
                  onClientUploadComplete={(res) => {
                    form.setValue("image", res[0].url);
                    setIsUploading(false);
                    form.handleSubmit(onSubmit)();
                    return;
                  }}
                  content={{
                    button({ ready }) {
                      if (ready) return <div>Upload Avatar</div>;
                      return <div>Uploading...</div>;
                    },
                  }}
                />
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
export default AvatarUploadForm;

"use client";
import { UploadDropzone } from "@/app/api/uploadthing/uploadthing";
import { cn } from "@/lib/utils";
import { VariantSchema } from "@/types/variant-schema";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const VariantImages = () => {
  const { control, setValue, setError, getValues } =
    useFormContext<z.infer<typeof VariantSchema>>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variantImages",
  });
  return (
    <div>
      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Variant tags</FormLabel>
            <FormDescription>
              You can upload multiple 10 images at once.
            </FormDescription>
            <FormControl>
              <UploadDropzone
                endpoint="variantImageUploader"
                className="ut-allowed-content:text-primary ut-label:text-primary ut-upload-icon:text-primary/70 ut-button:bg-primary cursor-pointer"
                //when image is chosen and doesn't finish uploading, this runs
                //created temporarily data for preview
                onBeforeUploadBegin={(files) => {
                  files.forEach((file) => {
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file), //created temporarily url for preview. url will start with "blob:"
                    });
                  });
                  return files;
                }}
                onUploadError={(error) => {
                  setError("variantImages", {
                    type: "validate",
                    message: error.message,
                  });
                }}
                onClientUploadComplete={(data) => {
                  const variantImages = getValues("variantImages");
                  variantImages.forEach((img, index) => {
                    if (img.url.startsWith("blob:")) {
                      const image = data.find((i) => i.name === img.name);
                      if (image) {
                        update(index, {
                          url: image.url,
                          name: image.name,
                          size: image.size,
                          key: image.key,
                        });
                      }
                    }
                  });
                }}
                config={{ mode: "auto" }} // auto upload image don't need to press upload button after choose image
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-2 my-2 flex-wrap">
        {fields.map((field, index) => (
          <div
            key={index}
            className={cn(
              "border-2 border-gray-200 rounded-md relative h-[100px] w-[100px] overflow-hidden",
              field.url.startsWith("blob:") && "animate-pulse transition-all"
            )}
          >
            <Image
              src={field.url}
              alt={field.name}
              width={70}
              height={50}
              className="object-cover w-full h-full"
            />
            <Trash
              className="w-4 h-4 cursor-pointer text-red-400 rounded-full absolute top-1 right-1"
              onClick={(e) => {
                e.preventDefault(); // prevent not to make form submit
                remove(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default VariantImages;

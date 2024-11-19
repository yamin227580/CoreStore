"use client";
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
import { VariantsWithImagesTags } from "@/lib/infer-types";
import { createVariant, deleteVariant } from "@/server/actions/variants";
import { VariantSchema } from "@/types/variant-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TagsInput from "./tags-input";
import VariantImages from "./variant-image";

type VariantDialogProps = {
  children: React.ReactNode;
  editMode: boolean;
  productId?: number;
  variant?: VariantsWithImagesTags;
};
const VariantDialog = ({
  children,
  editMode,
  productId,
  variant,
}: VariantDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof VariantSchema>>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      id: undefined,
      productId,
      editMode,
      productType: "black",
      color: "#000000",
      tags: [
        "iphone",
        "ipad",
        "MacBook",
        "Apple Watch",
        "Accessories",
        "Cover",
      ],
      variantImages: [],
    },
  });

  const { execute, status, result } = useAction(createVariant, {
    onSuccess({ data }) {
      setOpen(false);
      if (data?.success) {
        toast.success(data.success);
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const variantDelete = useAction(deleteVariant, {
    onSuccess({ data }) {
      setOpen(false);
      if (data?.success) {
        toast.success(data.success);
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const getData = () => {
    if (!editMode) {
      form.reset();
      return;
    }
    if (editMode && variant) {
      form.setValue("editMode", true);
      form.setValue("id", variant.id);
      form.setValue("color", variant.color);
      form.setValue("productId", variant.productId);
      form.setValue("productType", variant.productType);
      form.setValue(
        "tags",
        variant.variantTags.map((t) => t.tag)
      );
      form.setValue(
        "variantImages",
        variant.variantImages.map((img) => {
          return {
            url: img.image_url,
            size: Number(img.size),
            name: img.name,
          };
        })
      );
    }
  };
  useEffect(() => {
    getData();
  }, [variant]);

  const onSubmit = (values: z.infer<typeof VariantSchema>) => {
    const { id, productId, color, productType, tags, variantImages } = values;
    form.reset();
    execute({
      id,
      productId,
      color,
      editMode,
      productType,
      tags,
      variantImages,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[40rem] overflow-scroll">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "update an existing" : "create new"} product's variant
          </DialogTitle>
          <DialogDescription>Manage your product's variants</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your's variant title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      {...field}
                      handleOnChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <VariantImages />
            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={status === "executing" || !form.formState.isValid}
              >
                {editMode
                  ? "Update product's variant"
                  : "Create product's variant"}
              </Button>
              {editMode && (
                <Button
                  type="button"
                  variant={"destructive"}
                  className="w-full"
                  disabled={status === "executing" || !form.formState.isValid}
                  onClick={(e) => {
                    e.preventDefault();
                    variantDelete.execute({ id: Number(variant?.id) });
                  }}
                >
                  Delete product's variant
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default VariantDialog;

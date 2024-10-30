"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getSingleProduct, updateProduct } from "@/server/actions/products";
import { ProductSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Tiptap from "./tip-tap";

const CreateProudctForm = () => {
  const router = useRouter();
  const isEditMode = useSearchParams().get("edit_id");
  const [editProduct, setEditProduct] = useState<string>("");

  const isProductExit = async (id: number) => {
    if (isEditMode) {
      const response = await getSingleProduct(id);
      if (response.error) {
        toast.error(response.error);
        router.push("/dashboard/products");
        return;
      }
      if (response.success) {
        setEditProduct(response.success.title);
        form.setValue("title", response.success.title);
        form.setValue("description", response.success.description);
        form.setValue("price", response.success.price);
      }
    }
  };

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const { status, execute, result } = useAction(updateProduct, {
    onSuccess({ data }) {
      form.reset();
      if (data?.success) {
        toast.success(data.success);
        form.reset();
        router.push("/dashboard/products");
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    const { title, description, price } = values;
    execute({
      id: isEditMode ? Number(isEditMode) : undefined,
      title,
      description,
      price,
    });
  };

  useEffect(() => {
    form.setValue("description", "");
  }, [form]);

  useEffect(() => {
    if (isEditMode) {
      isProductExit(Number(isEditMode));
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Product" : "Create Product"} </CardTitle>
        <CardDescription>
          {isEditMode
            ? `Edit your product : ${form.getValues("title")}`
            : "Create a new product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="T-shirt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted rounded-md"
                      />
                      <Input
                        placeholder="Price must be shown in MMK"
                        {...field}
                        type="number"
                        step={100}
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={cn(
                "w-full my-4",
                status === "executing" && "animate-pulse"
              )}
              disabled={status === "executing"}
            >
              {isEditMode ? "Update Product" : "Create Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CreateProudctForm;

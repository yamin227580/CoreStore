"use client";

import VariantDialog from "@/components/products/variant-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VariantsWithImagesTags } from "@/lib/infer-types";
import { deleteProduct } from "@/server/actions/products";
import { ColumnDef, Row } from "@tanstack/react-table";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  variants: VariantsWithImagesTags[];
};

const ActionsCell = (row: Row<Product>) => {
  const product = row.original; //all column values in one row
  const { execute } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer text-primary focus:bg-primary/20 focus:text-primary font-medium duration-300">
          <Link href={`/dashboard/create-product/?edit_id=${product.id}`}>
            {" "}
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:bg-red-200 focus:text-red-600 font-medium duration-300"
          onClick={() => execute({ id: product.id })}
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const title = row.getValue("title") as string;
      return (
        <div className="w-12 h-12 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={50}
            height={50}
            className="w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImagesTags[];
      return (
        <div className="flex gap-1">
          {variants.map((variant, index) => (
            <VariantDialog
              editMode={true}
              productId={row.original.id}
              variant={variant}
              key={index}
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: variant.color }}
              />
            </VariantDialog>
          ))}
          <VariantDialog editMode={false} productId={row.original.id}>
            <CirclePlus className="w-5 h-5 hover:text-gray-500 duration-200 cursor-pointer" />
          </VariantDialog>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span className="text-sm font-medium">{title}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <span className="text-sm font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return ActionsCell(row);
    },
  },
];

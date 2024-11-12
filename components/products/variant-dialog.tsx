import { VariantsWithImagesTags } from "@/lib/infer-types";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editMode ? "update an existing" : "create new"} product's variant
          </DialogTitle>
          <DialogDescription>Manage your product's variants</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default VariantDialog;

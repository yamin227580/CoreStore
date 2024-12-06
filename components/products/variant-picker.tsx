"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
type VariantPickerProps = {
  id: number;
  color: string;
  productType: string;
  title: string;
  price: number;
  productId: number;
  image: string;
};
const VariantPicker = ({
  id,
  color,
  productType,
  title,
  price,
  productId,
  image,
}: VariantPickerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedVariantColor = searchParams.get("type") || productType;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <div
            onClick={() =>
              router.push(
                `/products/${id}?productId=${productId}&type=${productType}&image=${image}&title=${title}&price=${price}`
              )
            }
            style={{ backgroundColor: color }}
            className={cn(
              "w-5 h-5 rounded-full cursor-pointer",
              selectedVariantColor === productType
                ? "opacity-100"
                : "opacity-35"
            )}
          ></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{productType}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default VariantPicker;

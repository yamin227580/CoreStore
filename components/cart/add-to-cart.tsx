"use client";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const AddToCart = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState<number>(1);
  const searchParams = useSearchParams();
  const variantId = Number(searchParams.get("vid"));
  const productId = Number(searchParams.get("productId"));
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const image = searchParams.get("image");

  if (!variantId || !productId || !title || !price || !image) {
    return redirect("/");
  }
  const addToCartHandler = () => {
    addToCart({
      id: productId,
      name: title,
      price,
      image,
      variant: {
        variantId,
        quantity,
      },
    });
  };
  return (
    <>
      <div className="flex items-center justify-between gap-2 my-4">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          disabled={quantity === 1}
        >
          <Minus size={16} />
        </Button>
        <div className="bg-black text-white font-medium rounded-md w-full p-2 text-center">
          Quantity: {quantity}
        </div>
        <Button onClick={() => setQuantity(quantity + 1)}>
          <Plus size={16} />
        </Button>
      </div>
      <Button className="w-full" size={"lg"} onClick={addToCartHandler}>
        Add to cart
      </Button>
    </>
  );
};
export default AddToCart;

"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const AddToCart = () => {
  const [quantity, setQuantity] = useState<number>(1);
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
      <Button className="w-full" size={"lg"}>
        Add to cart
      </Button>
    </>
  );
};
export default AddToCart;

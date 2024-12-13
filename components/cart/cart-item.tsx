"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";
import EmptyCartImg from "@/public/empty-cart.png";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

const CartItem = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className="lg:w-1/2 mx-auto mb-4">
      {cart.length === 0 ? (
        <div className="flex items-center justify-center flex-col">
          <Image src={EmptyCartImg} alt="empty cart" width={300} height={300} />
          <p className="text-center mb-10 font-mono font-medium">
            Your cart is empty
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((cItem) => (
              <TableRow key={cItem.id}>
                <TableCell className="font-medium">{cItem.name}</TableCell>
                <TableCell>
                  <div>
                    <Image
                      className="rounded-md"
                      src={cItem.image}
                      alt={cItem.name}
                      width={50}
                      height={50}
                    />
                  </div>
                </TableCell>
                <TableCell>{cItem.variant.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(Number(cItem.price))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default CartItem;

"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";
import { totalPriceCalc } from "@/lib/total-price";
import EmptyCartImg from "@/public/empty-cart.png";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { Button } from "../ui/button";

const CartItem = () => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
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
        <div>
          <Table>
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size={"sm"}
                        onClick={() => {
                          removeFromCart({
                            ...cItem,
                            variant: { ...cItem.variant, quantity: 1 },
                          });
                        }}
                      >
                        -
                      </Button>
                      <p className="text-sm font-medium">
                        {cItem.variant.quantity}
                      </p>
                      <Button
                        size={"sm"}
                        onClick={() => {
                          addToCart({
                            ...cItem,
                            variant: { ...cItem.variant, quantity: 1 },
                          });
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(cItem.price))} USD
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalPriceCalc(cart))} USD
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Button
            size={"lg"}
            className="w-full mt-3 mb-6"
            onClick={() => setCartPosition("Checkout")}
          >
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
};
export default CartItem;

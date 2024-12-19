import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Variant = {
  variantId: number;
  quantity: number;
};
export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: string;
  variant: Variant;
};
export type CartType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  cartPosition: "Order" | "Checkout" | "Success";
  setCartPosition: (position: "Order" | "Checkout" | "Success") => void;
  clearCart: () => void;
};
export const useCartStore = create(
  persist<CartType>(
    (set) => ({
      cart: [],
      clearCart: () => set((state) => ({ cart: [] })),
      cartPosition: "Order",
      setCartPosition: (position) =>
        set((state) => ({ cartPosition: position })),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cItem) => cItem.variant.variantId === item.variant.variantId
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cItem) => {
              if (cItem.variant.variantId === item.variant.variantId) {
                return {
                  ...cItem,
                  variant: {
                    ...cItem.variant,
                    quantity: cItem.variant.quantity + item.variant.quantity,
                  },
                };
              }
              return cItem;
            });
            return { cart: updatedCart };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...item,
                  variant: {
                    variantId: item.variant.variantId,
                    quantity: item.variant.quantity,
                  },
                },
              ],
            };
          }
        }),
      removeFromCart: (item) =>
        set((state) => {
          const updatedCart = state.cart.map((cItem) => {
            if (cItem.variant.variantId === item.variant.variantId) {
              return {
                ...cItem,
                variant: {
                  ...cItem.variant,
                  quantity: cItem.variant.quantity - 1,
                },
              };
            }
            return cItem;
          });
          return {
            cart: updatedCart.filter((item) => item.variant.quantity > 0),
          };
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);

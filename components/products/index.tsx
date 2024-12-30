"use client";
import formatCurrency from "@/lib/formatCurrency";
import { VariantsWithProduct } from "@/lib/infer-types";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ProductProps = {
  productWithVariants: VariantsWithProduct[];
};
const Products = ({ productWithVariants }: ProductProps) => {
  const setProducts = useCartStore((state) => state.setProducts);
  setProducts(productWithVariants);
  const proudcts = useCartStore((state) => state.products);
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";
  const [filterProducts, setFilterProducts] = useState<VariantsWithProduct[]>(
    []
  );
  useEffect(() => {
    const filterItems = proudcts.filter(
      (item) => item.variantTags[0].tag.toLowerCase() === tagParams
    );
    setFilterProducts(filterItems);
    console.log("filter products", filterItems);
  }, [tagParams, proudcts]);
  console.log("all products", proudcts);

  if (!filterProducts) return;
  return (
    <main className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filterProducts.map((p) => {
        return (
          <Link
            key={p.id}
            className="bg-white p-2 rounded-md"
            href={`products/${p.id}?vid=${p.id}&productId=${p.productId}&type=${p.productType}&image=${p.variantImages[0].image_url}&title=${p.product.title}&price=${p.product.price}`}
          >
            <Image
              src={p.variantImages[0].image_url}
              alt={p.product.title}
              width={600}
              height={300}
              style={{
                height: "auto",
                maxHeight: "300px",
                width: "100%",
              }}
            />

            <hr className="my-2" />
            <h3 className="font-semibold">
              {p.product.title.substring(0, 26) + "..."}
            </h3>
            <p className="font-medium text-sm mt-1">
              {formatCurrency(p.product.price)} USD
            </p>
          </Link>
        );
      })}
    </main>
  );
};
export default Products;

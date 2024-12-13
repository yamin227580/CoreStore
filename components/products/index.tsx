import formatCurrency from "@/lib/formatCurrency";
import { VariantsWithProduct } from "@/lib/infer-types";
import Image from "next/image";
import Link from "next/link";

type ProductProps = {
  productWithVariants: VariantsWithProduct[];
};
const Products = ({ productWithVariants }: ProductProps) => {
  return (
    <main className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {productWithVariants.map((p) => {
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
              {formatCurrency(p.product.price)}
            </p>
          </Link>
        );
      })}
    </main>
  );
};
export default Products;

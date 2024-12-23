import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
import { db } from "@/server";

export default async function Home() {
  const productVariants = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    // orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  return (
    <main className="bg-[#f6f5f8]">
      <SearchBox productWithVariants={productVariants} />
      <Products productWithVariants={productVariants} />
    </main>
  );
}

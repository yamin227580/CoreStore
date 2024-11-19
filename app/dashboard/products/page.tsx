import placeHolderImage from "@/public/placeholder.jpg";
import { db } from "@/server";
import { columns } from "./column";
import { DataTable } from "./data-table";

const Products = async () => {
  const products = await db.query.products.findMany({
    with: {
      productVariants: { with: { variantImages: true, variantTags: true } },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  const productData = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      variants: product.productVariants ?? [],
      image:
        product.productVariants[0]?.variantImages[0]?.image_url ??
        placeHolderImage.src,
    };
  });
  return <DataTable columns={columns} data={productData} />;
};
export default Products;

import placeHolderImage from "@/public/placeholder.jpg";
import { db } from "@/server";
import { columns } from "./column";
import { DataTable } from "./data-table";

const Products = async () => {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  const productData = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      variants: [],
      image: placeHolderImage.src,
    };
  });
  return <DataTable columns={columns} data={productData} />;
};
export default Products;

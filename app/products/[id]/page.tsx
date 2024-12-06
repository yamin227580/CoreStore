import VariantPicker from "@/components/products/variant-picker";
import formatCurrency from "@/lib/formatCurrency";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";

type SingleProductProps = {
  params: {
    id: number;
  };
};

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
  });
  if (data) {
    const idArr = data.map((d) => ({
      id: d.id.toString(),
    }));
    return idArr;
  }
  return [];
}

const SingleProduct = async ({ params }: SingleProductProps) => {
  const productWithVariants = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, params.id),
    with: {
      product: {
        with: {
          productVariants: {
            with: {
              variantTags: true,
              variantImages: true,
            },
          },
        },
      },
    },
  });
  return (
    <>
      {productWithVariants && (
        <main>
          <div></div>
          <div>
            <h2 className="font-bold text-2xl">
              {productWithVariants.product.title}
            </h2>
            <p className="text-xs bg-gray-300 w-fit rounded-md p-1 my-2 font-medium">
              {productWithVariants.productType} Variant
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: productWithVariants.product.description,
              }}
            />
            <p className="font-bold text-2xl my-2">
              {formatCurrency(productWithVariants.product.price)} ks
            </p>

            <div className="flex gap-2 items-center">
              <p className="font-medium ">Colors:</p>
              {productWithVariants.product.productVariants.map((v) => (
                <VariantPicker
                  key={v.id}
                  {...v}
                  title={productWithVariants.product.title}
                  price={productWithVariants.product.price}
                  image={v.variantImages[0].image_url}
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};
export default SingleProduct;

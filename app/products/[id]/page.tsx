import AddToCart from "@/components/cart/add-to-cart";
import ImageSlider from "@/components/products/image-slider";
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

//for performance
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
  const currentProductVarientWithImgTag =
    await db.query.productVariants.findFirst({
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

  const currentVarWithImg = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, params.id),
    with: {
      variantImages: true,
    },
  });

  return (
    <>
      {currentProductVarientWithImgTag && (
        <main className="flex gap-4 mt-6 flex-col lg:flex-row pb-6">
          <div className="lg:flex-1">
            <ImageSlider variants={currentVarWithImg} />
          </div>
          <div className="lg:flex-1">
            <h2 className="font-bold text-2xl">
              {currentProductVarientWithImgTag.product.title}
            </h2>
            <p className="text-xs bg-gray-300 w-fit rounded-md p-1 my-2 font-medium">
              {currentProductVarientWithImgTag.productType} Variant
            </p>
            <hr className="mb-4 mt-1" />
            <div
              className="leading-8"
              dangerouslySetInnerHTML={{
                __html: currentProductVarientWithImgTag.product.description,
              }}
            />
            <p className="font-bold text-2xl my-4">
              {formatCurrency(currentProductVarientWithImgTag.product.price)}{" "}
              USD
            </p>

            <div className="flex gap-2 items-center">
              <p className="font-medium ">Colors:</p>
              {currentProductVarientWithImgTag.product.productVariants.map(
                (v) => (
                  <VariantPicker
                    key={v.id}
                    {...v}
                    title={currentProductVarientWithImgTag.product.title}
                    price={currentProductVarientWithImgTag.product.price}
                    image={v.variantImages[0].image_url}
                  />
                )
              )}
            </div>
            <AddToCart />
          </div>
        </main>
      )}
    </>
  );
};
export default SingleProduct;

"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { VariantsWithImagesTags } from "@/lib/infer-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ImageSliderProps = {
  variants: VariantsWithImagesTags[];
};

const ImageSlider = ({ variants }: ImageSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState<number[]>([0]);
  const searchParams = useSearchParams();
  const currentVariantType = searchParams.get("type") || "";

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("slidesInView", (e) => {
      setActiveIndex(e.slidesInView);
    });
  }, [api]);

  const updateSlider = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img) => (
              <CarouselItem key={img.image_url}>
                {img.image_url ? (
                  <Image
                    src={img.image_url}
                    alt={img.name}
                    width={600}
                    height={300}
                    priority
                  />
                ) : null}
              </CarouselItem>
            ))
        )}
      </CarouselContent>
      <div className="flex gap-4 py-4 items-center">
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img, index) => (
              <div key={img.image_url}>
                {img.image_url ? (
                  <Image
                    onClick={() => updateSlider(index)}
                    className={cn(
                      "rounded-md border-2 border-slate-200 cursor-pointer transition-all",
                      index === activeIndex[0]
                        ? "opacity-100 border-slate-400"
                        : "opacity-50"
                    )}
                    src={img.image_url}
                    alt={img.name}
                    width={72}
                    height={42}
                    priority
                  />
                ) : null}
              </div>
            ))
        )}
      </div>
    </Carousel>
  );
};
export default ImageSlider;

"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { VariantsWithImages } from "@/lib/infer-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type ImageSliderProps = {
  variants: VariantsWithImages | undefined;
};

const ImageSlider = ({ variants }: ImageSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState<number[]>([0]);

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
        {variants?.variantImages.map((img) => (
          <CarouselItem key={img.image_url}>
            {img.image_url ? (
              <Image
                src={img.image_url}
                alt={img.name}
                width={500}
                height={200}
                priority
              />
            ) : null}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-4 py-4 items-center">
        {variants?.variantImages.map((img, index) => (
          <div key={img.image_url}>
            {img.image_url ? (
              <Image
                onClick={() => updateSlider(index)}
                className={cn(
                  "rounded-md border-2 border-slate-200 cursor-pointer transition-all",
                  index === activeIndex[0]
                    ? "opacity-100 border-slate-400"
                    : "opacity-80"
                )}
                src={img.image_url}
                alt={img.name}
                width={72}
                height={42}
                priority
              />
            ) : null}
          </div>
        ))}
      </div>
    </Carousel>
  );
};
export default ImageSlider;

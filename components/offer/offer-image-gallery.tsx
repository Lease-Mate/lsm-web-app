"use client";

import { useState } from "react";
import ApiImage from "../api-image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

type OfferImageGalleryProps = {
  images: {
    id: string;
    imageResult: string;
  }[];
  thumbnailId: string;
};

export default function OfferImageGallery({ images, thumbnailId }: OfferImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(images.find((image) => image.id === thumbnailId) || images[0]);

  return (
    <div className="flex flex-col gap-7 h-full">
      <div className="h-4/5 w-full">
        <ApiImage
          base64={currentImage.imageResult}
          width={800}
          height={550}
          alt="offer image"
          className="w-[100%] h-[100%]"
        />
      </div>
      <div className="h-1/5">
        <Carousel
          opts={{
            align: "center",
          }}
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id} onClick={() => setCurrentImage(image)} className="cursor-pointer basis-1/3">
                <ApiImage
                  key={image.id}
                  base64={image.imageResult}
                  width={270}
                  height={130}
                  alt="offer image"
                  className="w-[270px] h-[130px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

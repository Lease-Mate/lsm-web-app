"use client";

import Image from "next/image";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

interface OfferSliderProps {
  title: string;
}

export default function OfferSlider({ title }: OfferSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [, setUpdate] = useState(false);

  const updateScrollState = useCallback(() => {
    if (api) {
      setUpdate((prev) => !prev);
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", updateScrollState);
    return () => {
      api.off("select", updateScrollState);
    };
  }, [api, updateScrollState]);

  return (
    <Card className="shadow-lg text-gray-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="w-full h-full flex flex-row items-center justify-between">
          <div className="font-bold text-lg">{title}</div>
          <div className="flex flex-row">
            <Button variant={"ghost"} size="icon" disabled={!api?.canScrollPrev()} onClick={() => api?.scrollPrev()}>
              <ChevronLeft strokeWidth={2.5} />
            </Button>
            <Button variant={"ghost"} size="icon" disabled={!api?.canScrollNext()} onClick={() => api?.scrollNext()}>
              <ChevronRight strokeWidth={2.5} size={30} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Carousel setApi={setApi} className="max-w-[300px] flex items-center justify-center">
          <CarouselContent>
            <CarouselItem>
              <div className="flex flex-col gap-4">
                <Image src="/mock/flat-1.jpg" alt="offer-1" width={300} height={200} className="" />
                <span className="font-bold text-xl">1 999 999 zł</span>
                <span className="text-md text-gray-600">5 pokoi, 25m2</span>
                <span className="text-md text-gray-600">Kraków, Małopolskie, Polska</span>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col gap-4">
                <Image src="/mock/flat-1.jpg" alt="offer-2" width={300} height={200} className="" />
                <span className="font-bold text-xl">1 999 999 zł</span>
                <span className="text-md text-gray-600">5 pokoi, 25m2</span>
                <span className="text-md text-gray-600">Kraków, Małopolskie, Polska</span>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col gap-4">
                <Image src="/mock/flat-1.jpg" alt="offer-3" width={300} height={200} className="" />
                <span className="font-bold text-xl">1 999 999 zł</span>
                <span className="text-md text-gray-600">5 pokoi, 25m2</span>
                <span className="text-md text-gray-600">Kraków, Małopolskie, Polska</span>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}

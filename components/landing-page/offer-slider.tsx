"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Bath, Bed, ChevronLeft, ChevronRight, LandPlot } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Offer } from "@/lib/types/types";
import ApiImage from "../api-image";
import { getImageById } from "@/lib/actions/image-actions";
import { getCityNameById } from "@/lib/actions/geo-actions";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

interface OfferSliderProps {
  title: string;
  offers: Offer[];
}

export default function OfferSlider({ title, offers }: OfferSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [, setUpdate] = useState(false);
  const [offersWithThumbnails, setOffersWithThumbnails] = useState<(Offer & { thumbnail: string; city: string })[]>([]);
  const router = useRouter();

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

  useEffect(() => {
    const fetchThumbnails = async () => {
      const offersWithThumbnails = await Promise.all(
        offers.map(async (offer) => {
          const thumbnail = await getImageById(offer.thumbnailId);
          const city = await getCityNameById(offer.address.city);
          return { ...offer, thumbnail, city: city.name };
        })
      );
      setOffersWithThumbnails(offersWithThumbnails);
    };

    fetchThumbnails();
  }, [offers]);

  return (
    <Card className="shadow-lg text-gray-900 bg-gray-50 border-none">
      <CardHeader className="flex flex-row items-center justify-between border-border border-b-2 p-5">
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
      <CardContent className="p-0">
        <Carousel setApi={setApi} className="max-w-[350px] flex items-center justify-center">
          <CarouselContent>
            {offersWithThumbnails.map((offer) => (
              <CarouselItem className="cursor-pointer" key={offer.id} onClick={() => router.push(`/offer/${offer.id}`)}>
                <div className="flex flex-col">
                  <div className="p-3">
                    <div className="font-semibold line-clamp-1">{offer.title}</div>
                    <div className="text-muted-foreground text-sm">{offer.city}</div>
                  </div>
                  <ApiImage
                    base64={offer.thumbnail}
                    alt={offer.title}
                    className="w-full h-[230px]"
                    width={350}
                    height={230}
                  />
                  <div className="flex py-5 px-3 justify-between items-center mt-2">
                    <div className="flex gap-2">
                      <Badge variant={"outline"} className="flex items-center gap-2">
                        <Bed size={14} strokeWidth={2.25} />
                        {offer.rooms}
                      </Badge>
                      <Badge variant={"outline"} className="flex items-center gap-2">
                        <Bath size={14} strokeWidth={2.25} />
                        {offer.rooms}
                      </Badge>
                      <Badge variant={"outline"} className="flex items-center gap-2">
                        <LandPlot size={14} strokeWidth={2.25} />
                        {offer.surfaceArea + " m²"}
                      </Badge>
                    </div>
                    <div className="font-semibold">{offer.rent + " zł"}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}

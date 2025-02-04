"use client";

import { getThumbnailById } from "@/lib/actions/image-actions";
import { Offer } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { House, LandPlot, MapPinHouse } from "lucide-react";
import ApiImage from "../api-image";
import { cn } from "@/lib/utils";

type OfferRowProps = {
  offer: Offer;
  className?: string;
};

export default function OfferRow({ offer, className }: OfferRowProps) {
  const [thumbnail, setThumbnail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchThumbnail = async () => {
      const thumbnail = await getThumbnailById(offer.thumbnailId);
      setThumbnail(thumbnail);
    };

    fetchThumbnail();
  }, []);

  return (
    <div
      className={cn(
        "bg-background p-4 pr-6 flex gap-10 cursor-pointer hover:bg-gray-200/55 ease-in duration-200 border-b border-border",
        className
      )}
      onClick={() => router.push(`/offer/${offer.id}`)}
    >
      <ApiImage base64={thumbnail} width={350} height={200} alt="offer image" className="w-[350px] h-[200px]" />
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between gap-10">
          <div className="flex flex-col">
            <div className="font-bold text-xl">{offer.title}</div>
            <div className="line-clamp-3">{offer.description}</div>
          </div>
          <div className="font-bold text-xl whitespace-nowrap">{offer.rent + " zł"}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPinHouse size={22} />
              {offer.address.street +
                " " +
                offer.address.buildingNumber +
                " m. " +
                offer.address.apartmentNumber +
                ", " +
                offer.address.zipCode +
                " " +
                offer.address.city}
            </div>
            <div className="flex items-center gap-2">
              <House size={22} />
              {offer.rooms + (offer.rooms > 4 ? " pokoi" : " pokoje")}
            </div>
            <div className="flex items-center gap-2">
              <LandPlot size={22} />
              {offer.surfaceArea + " m²"}
            </div>
          </div>
          <div className="self-end">
            <span className="font-semibold">Dostępne od </span>
            {offer.availableFrom}
          </div>
        </div>
      </div>
    </div>
  );
}

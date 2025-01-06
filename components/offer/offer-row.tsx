"use client";

import { getThumbnailById } from "@/lib/actions/image-actions";
import { Offer } from "@/lib/types";
import { useEffect, useState } from "react";
import Image from "next/image";

type OfferRowProps = {
  offer: Offer;
};

export default function OfferRow({ offer }: OfferRowProps) {
  const [thumbnail, setThumbnail] = useState<Uint8Array>(new Uint8Array());
  const blob = new Blob([thumbnail], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);

  useEffect(() => {
    const fetchThumbnail = async () => {
      const thumbnail = await getThumbnailById(offer.thumbnailId);
      setThumbnail(new Uint8Array(thumbnail));
    };

    fetchThumbnail();
  }, []);

  return (
    <div className="bg-background p-4 flex gap-10">
      <Image src={url} width={400} height={230} alt="offer image" className="w-[400px] h-[230px]" />
      <div className="flex-1 flex flex-col justify-between">
        <div>{offer.title}</div>
        <div>{offer.address.street + " " + offer.address.buildingNumber + " m. " + offer.address.apartmentNumber}</div>
        <div>{offer.address.zipCode + " " + offer.address.city}</div>
        <div>{offer.rooms + " pokoi, " + offer.surfaceArea + " m^2"}</div>
        {offer.floor && <div>Piętro {offer.floor}</div>}
        <div>{"Dostępne od " + offer.availableFrom}</div>
        <div>{offer.rent + " zł/miesiąc"}</div>
      </div>
    </div>
  );
}

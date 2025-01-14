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
      <Image src={url} width={350} height={200} alt="offer image" className="w-[350px] h-[200px]" />
      <div className="flex-1 flex flex-col justify-between">
        <div className="font-bold text-xl flex justify-between">
          <span>{offer.title}</span>
          <span>{offer.rent + " zł / miesiąc"}</span>
        </div>
        <div>
          <div>{offer.title}</div>
          <div>{"Dostępne od " + offer.availableFrom}</div>
        </div>
        <div>
          <div>
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
          <div>{offer.rooms + (offer.rooms > 4 ? " pokoi " : " pokoje ") + "" + offer.surfaceArea + " m^2"}</div>
        </div>
        {/* <div></div>
        <div></div>
        <div>{offer.address.zipCode + " " + offer.address.city}</div>
        <div>{offer.rooms + " pokoi, " + offer.surfaceArea + " m^2"}</div>
        {offer.floor && <div>Piętro {offer.floor}</div>}
        <div></div>
        <div>{offer.rent + " zł/miesiąc"}</div> */}
      </div>
    </div>
  );
}

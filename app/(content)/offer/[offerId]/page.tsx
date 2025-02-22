import { RequestLeaseDialog } from "@/components/lease/request-lease-dialog";
import OfferImageGallery from "@/components/offer/offer-image-gallery";
import { Button } from "@/components/ui/button";
import { getCityNameById } from "@/lib/actions/geo-actions";
import { getImagesByOfferId } from "@/lib/actions/image-actions";
import { getOfferById } from "@/lib/actions/offer-actions";
import { House, LandPlot, MapPinHouse } from "lucide-react";
import Link from "next/link";

export default async function OfferPage({ params }: { params: Promise<{ offerId: string }> }) {
  const offerId = (await params).offerId;
  const offer = await getOfferById(offerId);
  const images = await getImagesByOfferId(offerId);
  const cityName = await getCityNameById(offer.address.city);

  return (
    <div className="w-[90%] bg-background flex-1 p-5 flex overflow-hidden">
      <div className="flex-1">
        <OfferImageGallery images={images} thumbnailId={offer.thumbnailId} />
      </div>
      <div className="px-5 flex flex-col gap-10 flex-1">
        <h1 className="text-2xl font-semibold">{offer.title}</h1>
        <h2 className="text-xl font-semibold">{offer.rent + "zł / miesiąc"}</h2>
        <h3 className="text-justify text-black/80 flex-1">{offer.description}</h3>
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
                cityName.name}
            </div>
            <div className="flex items-center gap-2">
              <House size={22} />
              {offer.rooms + (offer.rooms > 4 ? " pokoi" : " pokoje")}
            </div>
            <div className="flex items-center gap-2">
              <LandPlot size={22} />
              {offer.surfaceArea + " m²"}
            </div>
            {offer.floor && (
              <div className="flex items-center gap-2">
                <LandPlot size={22} />
                {offer.floor + " piętro"}
              </div>
            )}
          </div>
          <div className="self-end">
            <span className="font-semibold">Dostępne od </span>
            {offer.availableFrom}
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-5 h-1/5 justify-end">
          <Link href={`/messages?${new URLSearchParams({ receiverId: offer.appUserId }).toString()}`}>
            <Button className="w-full font-semibold">Wyślij wiadomość do właściciela</Button>
          </Link>
          <RequestLeaseDialog offerId={offerId} />
        </div>
      </div>
    </div>
  );
}

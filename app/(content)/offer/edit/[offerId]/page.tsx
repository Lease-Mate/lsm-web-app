import OfferEditForm from "@/components/offer/offer-edit-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getOfferById } from "@/lib/actions/offer-actions";

export default async function EditOfferPage({ params }: { params: Promise<{ offerId: string }> }) {
  const offerId = (await params).offerId;
  const offer = await getOfferById(offerId);

  return (
    <>
      <div className="w-[75%] flex-1 shadow-lg overflow-hidden">
        <ScrollArea className="w-full h-full bg-background p-5" type="always">
          <OfferEditForm offer={offer} />
        </ScrollArea>
      </div>
    </>
  );
}

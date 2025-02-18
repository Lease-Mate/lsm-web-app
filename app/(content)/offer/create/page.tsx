import OfferForm from "@/components/offer/offer-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OfferCreatePage() {
  return (
    <>
      <div className="w-[75%] flex-1 shadow-lg overflow-hidden">
        <ScrollArea className="w-full h-full bg-background p-5" type="always">
          <OfferForm />
        </ScrollArea>
      </div>
    </>
  );
}

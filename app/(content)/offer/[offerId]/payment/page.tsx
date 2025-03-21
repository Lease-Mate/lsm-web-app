"use client";

import { Button } from "@/components/ui/button";
import { payForOffer } from "@/lib/actions/offer-actions";
import { redirect, useParams } from "next/navigation";
import { toast } from "sonner";

export default function OfferPaymentPage() {
  const offerId = useParams().offerId as string;

  if (!offerId) {
    redirect("/my-offers");
  }

  const handleOfferPayment = async () => {
    const result = await payForOffer(offerId);
    if (!result.error) {
      toast.success("Oferta została opłacona");
      redirect("/my-offers");
    } else {
      toast.error("Nie udało się opłacić oferty");
      return;
    }
  };

  return (
    <div className="w-[75%] flex-1 shadow-lg flex flex-col items-center justify-center bg-background">
      <form action={handleOfferPayment}>
        <Button type="submit">Opłać ofertę</Button>
      </form>
    </div>
  );
}

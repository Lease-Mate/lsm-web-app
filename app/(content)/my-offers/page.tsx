"use client";

import OfferRow from "@/components/offer/offer-row";
import { SortByButton } from "@/components/offer/sort-by-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteOffer, getOffersForUser, publishOffer } from "@/lib/actions/offer-actions";
import { Offer } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [sortBy, setSortBy] = useState<{ field: "price" | "surfaceArea" | null; order: "asc" | "desc" }>({
    field: null,
    order: "desc",
  });
  const router = useRouter();

  const sortedOffers = offers.slice().sort((a, b) => {
    if (sortBy.field === "price") {
      return sortBy.order === "asc" ? a.rent - b.rent : b.rent - a.rent;
    }
    if (sortBy.field === "surfaceArea") {
      return sortBy.order === "asc" ? a.surfaceArea - b.surfaceArea : b.surfaceArea - a.surfaceArea;
    }
    return 0;
  });

  useEffect(() => {
    const fetchOffers = async () => {
      getOffersForUser().then((data) => setOffers(data));
    };

    fetchOffers();
  }, []);

  const handleOfferDelete = async (offerId: string) => {
    const result = await deleteOffer(offerId);
    if (result?.error) {
      toast.error("Nie udało się usunąć oferty");
      return;
    }
    setOffers(offers.filter((offer) => offer.id !== offerId));
    toast.success("Oferta została usunięta");
    return;
  };

  const handleOfferPublish = async (offerId: string) => {
    const result = await publishOffer(offerId);
    if (result?.error) {
      toast.error("Nie udało się opublikować oferty");
      return;
    }
    setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, offerStatus: "PUBLISHED" } : offer)));
    toast.success("Oferta została opublikowana");
    return;
  };

  return (
    <>
      <div className="w-[90%] bg-background flex-1 p-5 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center border-b border-border p-3">
          <h1 className="font-bold text-xl">Moje oferty</h1>
          <div className="flex gap-2">
            <SortByButton sortBy={sortBy} onSortChange={(field, order) => setSortBy({ field, order })} />
          </div>
        </div>
        <ScrollArea className="h-full w-full">
          {sortedOffers.length > 0 ? (
            sortedOffers.map((offer) => (
              <div key={offer.id} className="flex">
                <OfferRow key={offer.id} offer={offer} className="flex-1" showBadge={true} />
                <div className="flex flex-col">
                  <Button
                    variant={"outline"}
                    size="icon"
                    className="flex-1 w-full"
                    onClick={() => router.push(`/offer/edit/${offer.id}`)}
                  >
                    Edytuj
                  </Button>
                  {offer.offerStatus === "UNPAID" && (
                    <Button
                      variant={"outline"}
                      size="icon"
                      className="flex-1 w-full"
                      onClick={() => router.push(`/offer/${offer.id}/payment`)}
                    >
                      Opłać
                    </Button>
                  )}
                  {offer.offerStatus === "PAID" && (
                    <Button
                      variant={"outline"}
                      size="icon"
                      className="flex-1 w-full"
                      onClick={() => handleOfferPublish(offer.id)}
                    >
                      Opublikuj
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"outline"} className="flex-1 w-full">
                        Usuń
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Usuń ofertę</AlertDialogTitle>
                        <AlertDialogDescription>Czy na pewno chcesz usunąć ofertę?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleOfferDelete(offer.id)}>Usuń</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            <p className="flex-1 flex justify-center items-center p-10 text-2xl text-center flex-col">
              Nie utworzyłeś jeszcze żadnej ofert.{" "}
              <Link href={"/lease"}>
                <Button variant={"link"} className="text-2xl">
                  Utworz teraz!
                </Button>
              </Link>
            </p>
          )}
        </ScrollArea>
      </div>
    </>
  );
}

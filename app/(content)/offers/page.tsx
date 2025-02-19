"use client";

import OfferFilterSheet from "@/components/offer/offer-filter-sheet";
import OfferRow from "@/components/offer/offer-row";
import { SortByButton } from "@/components/offer/sort-by-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getOffersByParameters } from "@/lib/actions/offer-actions";
import { Offer } from "@/lib/types/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [sortBy, setSortBy] = useState<{ field: "price" | "surfaceArea" | null; order: "asc" | "desc" }>({
    field: null,
    order: "desc",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchOffers = async () => {
      const params = {
        city: searchParams.get("city") || undefined,
        availableFrom: searchParams.get("availableFrom") || undefined,
        availableTo: searchParams.get("availableTo") || undefined,
        rentFrom: searchParams.get("rentFrom") ? parseInt(searchParams.get("rentFrom") as string) : undefined,
        rentTo: searchParams.get("rentTo") ? parseInt(searchParams.get("rentTo") as string) : undefined,
        surfaceAreaFrom: searchParams.get("surfaceAreaFrom")
          ? parseInt(searchParams.get("surfaceAreaFrom") as string)
          : undefined,
        surfaceAreaTo: searchParams.get("surfaceAreaTo")
          ? parseInt(searchParams.get("surfaceAreaTo") as string)
          : undefined,
      };

      getOffersByParameters(params).then((data) => setOffers(data));
    };

    fetchOffers();
  }, [searchParams]);

  const sortedOffers = offers.slice().sort((a, b) => {
    if (sortBy.field === "price") {
      return sortBy.order === "asc" ? a.rent - b.rent : b.rent - a.rent;
    }
    if (sortBy.field === "surfaceArea") {
      return sortBy.order === "asc" ? a.surfaceArea - b.surfaceArea : b.surfaceArea - a.surfaceArea;
    }
    return 0;
  });

  return (
    <>
      <div className="w-[90%] bg-background flex-1 p-5 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center border-b border-border p-3">
          <h1 className="font-bold text-xl">Wybrane oferty</h1>
          <div className="flex gap-2">
            <SortByButton sortBy={sortBy} onSortChange={(field, order) => setSortBy({ field, order })} />
            <OfferFilterSheet />
          </div>
        </div>
        <ScrollArea className="h-full w-full">
          {sortedOffers.length > 0 ? (
            sortedOffers.map((offer) => <OfferRow key={offer.id} offer={offer} />)
          ) : (
            <p className="flex-1 flex justify-center items-center p-10 text-2xl text-center">
              Niestety, ale nie znaleźliśmy pasujących ofert. <br /> Proszę dostosuj filtry.
            </p>
          )}
        </ScrollArea>
      </div>
    </>
  );
}

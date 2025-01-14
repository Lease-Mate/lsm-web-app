"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import OfferSearchForm from "./offer-search-form";

export default function OfferFilterSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"}>Filtrowanie</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtrowanie Ofert</SheetTitle>
          <SheetDescription>
            Wybierz kryteria, które chcesz zastosować do filtrowania ofert. Po wybraniu kliknij przycisk &quot;Zastosuj
            filtry&quot;.
          </SheetDescription>
          <div className="flex gap-4 flex-col">
            <OfferSearchForm setOpen={setOpen} />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

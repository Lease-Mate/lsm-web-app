"use client";

import { sendRentRequest } from "@/lib/actions/lease-actions";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface RequestLeaseDialogProps {
  offerId: string;
}

export const RequestLeaseDialog = ({ offerId }: RequestLeaseDialogProps) => {
  const handleButtonClick = async () => {
    try {
      await sendRentRequest(offerId);
      toast.success("Pomyślnie wysłano zapytanie.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full font-semibold">Wyślij zapytanie o wynajęcie</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wysłanie zapytania o wynajęcie nieruchomości</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz wysłać zapytanie o wynajęcie nieruchomości? Po wysłaniu zapytania właściciel
            nieruchomości otrzyma powiadomienie o Twoim zainteresowaniu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleButtonClick();
              }}
            >
              <Button>Wyślij zapytanie</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

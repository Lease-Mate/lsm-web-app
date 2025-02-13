"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  acceptRentAsk,
  getOwnerRequests,
  getUserRequests,
  rejectRentAsk,
  revokeRentRequest,
} from "@/lib/actions/lease-actions";
import { getUserById } from "@/lib/actions/user-actions";
import { Check, Undo2, X } from "lucide-react";
import { getOfferById } from "@/lib/actions/offer-actions";
import { RentRequest } from "@/lib/types";
import { toast } from "sonner";

export default function OfferRentAskPage() {
  const [userRentWithDetails, setUserRentWithDetails] = useState([]);
  const [ownerRentWithDetails, setOwnerRentWithDetails] = useState([]);

  const fetchUserRents = async () => {
    const userRents = await getUserRequests();
    const userRentWithDetails = await Promise.all(
      userRents.map(async (rent: RentRequest) => {
        const offerDetails = await getOfferById(rent.offerId);
        return { ...rent, offerDetails };
      })
    );
    setUserRentWithDetails(userRentWithDetails);
  };

  const fetchOwnerRents = async () => {
    const ownerRents = await getOwnerRequests();
    const ownerRentWithDetails = await Promise.all(
      ownerRents.map(async (rent: RentRequest) => {
        const userDetails = await getUserById(rent.userId);
        const offerDetails = await getOfferById(rent.offerId);
        return { ...rent, offerDetails, userDetails };
      })
    );
    setOwnerRentWithDetails(ownerRentWithDetails);
  };

  useEffect(() => {
    fetchUserRents();
    fetchOwnerRents();
  }, []);

  const handleAcceptRentAsk = async (offerId: string, rentId: string) => {
    try {
      await acceptRentAsk(offerId, rentId);
      toast.success("Pomyślnie zaakceptowano zapytanie o wynajem");
      fetchOwnerRents();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRejectRentAsk = async (offerId: string, rentId: string) => {
    try {
      await rejectRentAsk(offerId, rentId);
      toast.success("Pomyślnie odrzucono zapytanie o wynajem");
      fetchOwnerRents();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRevokeRentRequest = async (rentId: string) => {
    try {
      await revokeRentRequest(rentId);
      toast.success("Pomyślnie anulowano zapytanie o wynajem");
      fetchUserRents();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[90%] bg-background flex-1 p-5 flex overflow-hidden">
      <Tabs className="flex-1" defaultValue="myAsks">
        <TabsList className="flex items-center">
          <TabsTrigger value="myAsks" className="flex-1 font-bold text-lg">
            Twoje zapytania
          </TabsTrigger>
          <TabsTrigger value="asksToYou" className="flex-1 font-bold text-lg">
            Zapytania do Ciebie
          </TabsTrigger>
        </TabsList>
        <TabsContent value="myAsks">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-2/12">Data</TableHead>
                <TableHead className="font-bold w-7/12">Ogłoszenie</TableHead>
                <TableHead className="font-bold w-2/12">Status</TableHead>
                <TableHead className="font-bold w-1/12">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRentWithDetails.map((item) => (
                <TableRow key={item.id}>
                  <TableHead>{new Date(item.requestDate).toLocaleString()}</TableHead>
                  <TableHead>{item.offerDetails.title}</TableHead>
                  <TableHead>{item.status === "REQUESTED" ? "Wysłano" : "Odrzucono"}</TableHead>
                  <TableHead>
                    {item.status === "REQUESTED" ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleRevokeRentRequest(item.id);
                        }}
                      >
                        <Button variant={"ghost"} size={"icon"} className="hover:text-destructive">
                          <Undo2 strokeWidth={3} />
                        </Button>
                      </form>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleRevokeRentRequest(item.id);
                        }}
                      >
                        <Button variant={"ghost"} size={"icon"} className="hover:text-destructive">
                          <X strokeWidth={3} />
                        </Button>
                      </form>
                    )}
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="asksToYou">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-1/12">Imię</TableHead>
                <TableHead className="font-bold w-1/12">Nazwisko</TableHead>
                <TableHead className="font-bold w-1/12">Wiek</TableHead>
                <TableHead className="font-bold w-2/12">Data</TableHead>
                <TableHead className="font-bold w-4/12">Ogłoszenie</TableHead>
                <TableHead className="font-bold w-2/12">Status</TableHead>
                <TableHead className="font-bold w-1/12">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ownerRentWithDetails.map((item) => (
                <TableRow key={item.id}>
                  <TableHead>{item.userDetails.name}</TableHead>
                  <TableHead>{item.userDetails.surname}</TableHead>
                  <TableHead>
                    {new Date().getFullYear() - new Date(item.userDetails.dateOfBirth).getFullYear()}
                  </TableHead>
                  <TableHead>{new Date(item.requestDate).toLocaleString()}</TableHead>
                  <TableHead>
                    <div className="line-clamp-1 overflow-hidden text-ellipsis">{item.offerDetails.title}</div>
                  </TableHead>
                  <TableHead>{item.status === "REQUESTED" ? "Wysłano" : "Odrzucono"}</TableHead>
                  <TableHead className="flex items-center gap-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAcceptRentAsk(item.offerId, item.id);
                      }}
                    >
                      <Button type="submit" variant={"ghost"} size={"icon"} className="hover:text-green-500">
                        <Check strokeWidth={3} />
                      </Button>
                    </form>
                    {
                      //TODO ADD REJECT FUNCTIONALITY
                    }
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleRejectRentAsk(item.offerId, item.id);
                      }}
                    >
                      <Button variant={"ghost"} size={"icon"} className="hover:text-destructive">
                        <X strokeWidth={3} />
                      </Button>
                    </form>
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

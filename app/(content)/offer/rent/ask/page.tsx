"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  acceptRentAsk,
  getOwnerRentRequests,
  getUserRentRequests,
  rejectRentAsk,
  revokeRentRequest,
} from "@/lib/actions/lease-actions";
import { getUserById } from "@/lib/actions/user-actions";
import { Check, Undo2, X } from "lucide-react";
import { getOfferById } from "@/lib/actions/offer-actions";
import { toast } from "sonner";

export default function OfferRentAskPage() {
  const [userRentWithDetails, setUserRentAsksWithDetails] = useState([]);
  const [ownerRentAsksWithDetails, setOwnerRentAsksWithDetails] = useState([]);

  const fetchUserRentAsks = async () => {
    const userRentAsks = await getUserRentRequests();
    const userRentAsksWithDetails = await Promise.all(
      userRentAsks.map(async (rent) => {
        const offerDetails = await getOfferById(rent.offerId);
        return { ...rent, offerDetails };
      })
    );

    setUserRentAsksWithDetails(userRentAsksWithDetails);
  };

  const fetchOwnerRentAsks = async () => {
    const ownerRentAsks = await getOwnerRentRequests();
    const ownerRentAsksWithDetails = await Promise.all(
      ownerRentAsks.map(async (rent) => {
        const userDetails = await getUserById(rent.userId);
        const offerDetails = await getOfferById(rent.offerId);
        return { ...rent, offerDetails, userDetails };
      })
    );
    setOwnerRentAsksWithDetails(ownerRentAsksWithDetails);
  };

  useEffect(() => {
    fetchUserRentAsks();
    fetchOwnerRentAsks();
  }, []);

  const handleAcceptRentAsk = async (offerId: string, rentId: string) => {
    try {
      await acceptRentAsk(offerId, rentId);
      toast.success("Pomyślnie zaakceptowano zapytanie o wynajem");
      fetchOwnerRentAsks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRejectRentAsk = async (offerId: string, rentId: string) => {
    try {
      await rejectRentAsk(offerId, rentId);
      toast.success("Pomyślnie odrzucono zapytanie o wynajem");
      fetchOwnerRentAsks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRevokeRentRequest = async (rentId: string) => {
    try {
      await revokeRentRequest(rentId);
      toast.success("Pomyślnie anulowano zapytanie o wynajem");
      fetchUserRentAsks();
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
                  <TableCell>{new Date(item.requestDate).toLocaleString()}</TableCell>
                  <TableCell>{item.offerDetails.title}</TableCell>
                  <TableCell>{item.status === "REQUESTED" ? "Wysłano" : "Odrzucono"}</TableCell>
                  <TableCell>
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
                  </TableCell>
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
              {ownerRentAsksWithDetails.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.userDetails.name}</TableCell>
                  <TableCell>{item.userDetails.surname}</TableCell>
                  <TableCell>
                    {new Date().getFullYear() - new Date(item.userDetails.dateOfBirth).getFullYear()}
                  </TableCell>
                  <TableCell>{new Date(item.requestDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="line-clamp-1 overflow-hidden text-ellipsis">{item.offerDetails.title}</div>
                  </TableCell>
                  <TableCell>{item.status === "REQUESTED" ? "Wysłano" : "Odrzucono"}</TableCell>
                  <TableCell className="flex items-center gap-2">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

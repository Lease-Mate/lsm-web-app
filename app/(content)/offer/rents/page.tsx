"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOwnerRents, getRentPayments, getUserRents } from "@/lib/actions/lease-actions";
import { getOfferById } from "@/lib/actions/offer-actions";
import { getUserById } from "@/lib/actions/user-actions";
import { RentRequest } from "@/lib/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OfferRentsPage() {
  const [userRentsWithDetails, setUserRentsWithDetails] = useState([]);
  const [ownerRentsWithDetails, setOwnerRentsWithDetails] = useState([]);

  const fetchUserRents = async () => {
    const userRents = await getUserRents();
    const userRentWithDetails = await Promise.all(
      userRents.map(async (rent: RentRequest) => {
        const offerDetails = await getOfferById(rent.offerId);
        const paymentDetails = await getRentPayments(rent.id);
        return { ...rent, offerDetails, paymentDetails };
      })
    );
    setUserRentsWithDetails(userRentWithDetails);
  };

  const fetchOwnerRents = async () => {
    const ownerRents = await getOwnerRents();
    const ownerRentWithDetails = await Promise.all(
      ownerRents.map(async (rent: RentRequest) => {
        const offerDetails = await getOfferById(rent.offerId);
        const userDetails = await getUserById(rent.userId);
        return { ...rent, offerDetails, userDetails };
      })
    );
    setOwnerRentsWithDetails(ownerRentWithDetails);
  };

  useEffect(() => {
    fetchUserRents();
    fetchOwnerRents();
  }, []);

  return (
    <div className="w-[90%] bg-background flex-1 p-5 flex overflow-hidden">
      <Tabs className="flex-1" defaultValue="myRents">
        <TabsList className="flex items-center">
          <TabsTrigger value="myRents" className="flex-1 font-bold text-lg">
            Moje najmy
          </TabsTrigger>
          <TabsTrigger value="myLeases" className="flex-1 font-bold text-lg">
            Moje wynajmy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="myRents">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-2/12">Data</TableHead>
                <TableHead className="font-bold w-7/12">Ogłoszenie</TableHead>
                <TableHead className="font-bold w-2/12">Status</TableHead>
                <TableHead className="font-bold w-1/12">Płatności</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRentsWithDetails.map((rent) => (
                <TableRow key={rent.id}>
                  <TableCell>{new Date(rent.requestDate).toLocaleString()}</TableCell>
                  <TableCell>{rent.offerDetails.title}</TableCell>
                  <TableCell>{rent.status === "ACTIVE" ? "Aktywne" : "Nieaktywne"}</TableCell>
                  <TableCell>
                    <Link href={`/offer/rent/${rent.id}/payment`}>
                      <Button variant="outline">Szczegóły</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="myLeases">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-1/12">Imię</TableHead>
                <TableHead className="font-bold w-1/12">Nazwisko</TableHead>
                <TableHead className="font-bold w-1/12">Wiek</TableHead>
                <TableHead className="font-bold w-2/12">Data</TableHead>
                <TableHead className="font-bold w-4/12">Ogłoszenie</TableHead>
                <TableHead className="font-bold w-2/12">Status</TableHead>
                <TableHead className="font-bold w-1/12">Płatności</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ownerRentsWithDetails.map((rent) => (
                <TableRow key={rent.id}>
                  <TableCell>{rent.userDetails.name}</TableCell>
                  <TableCell>{rent.userDetails.surname}</TableCell>
                  <TableCell>
                    {new Date().getFullYear() - new Date(rent.userDetails.dateOfBirth).getFullYear()}
                  </TableCell>
                  <TableCell>{new Date(rent.requestDate).toLocaleString()}</TableCell>
                  <TableCell>{rent.offerDetails.title}</TableCell>
                  <TableCell>{rent.status === "ACTIVE" && "Aktywne"}</TableCell>
                  <TableCell>
                    <Link href={`/offer/rent/${rent.id}/payment`}>
                      <Button variant="outline">Szczegóły</Button>
                    </Link>
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

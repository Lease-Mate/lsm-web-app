"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/auth-context";
import { getRentById, getRentPayments } from "@/lib/actions/lease-actions";
import { getOfferById } from "@/lib/actions/offer-actions";
import { Offer, Payment, Rent } from "@/lib/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RentPaymentsPage() {
  const rentId = useParams().rentId as string;
  const { user } = useAuth();
  const [rentPayments, setRentPayments] = useState<Payment[]>([]);
  const [rent, setRent] = useState<Rent>();
  const [role, setRole] = useState<"user" | "owner">();
  const [offer, setOffer] = useState<Offer>();

  const fetchData = async () => {
    const payments = await getRentPayments(rentId);
    const rent = await getRentById(rentId);
    const offer = await getOfferById(rent.offerId);

    setRentPayments(payments);
    setRent(rent);
    setOffer(offer);
    setRole(user?.id === rent.userId ? "user" : user?.id === rent.ownerId ? "owner" : undefined);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[90%] bg-background flex-1 p-5 flex overflow-hidden flex-col">
      <h1 className="p-2 font-semibold">Lista płatności dla ogłoszenia &quot;{offer?.title}&quot;.</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold w-1/5">Termin płatności</TableHead>
            <TableHead className="font-bold w-1/5">Status</TableHead>
            <TableHead className="font-bold w-1/5">Kwota</TableHead>
            <TableHead className="font-bold w-1/5">Data płatności</TableHead>
            {role === "user" && <TableHead className="font-bold w-1/5">Akcje</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.dueDate}</TableCell>
              <TableCell>{payment.status === "UNPAID" ? "Nieopłacone" : "Opłacone"}</TableCell>
              <TableCell>{offer.rent}</TableCell>
              <TableCell>
                {payment.paymentDate ? new Date(payment.paymentDate).toLocaleString() : "Nie opłacono"}
              </TableCell>
              {role === "user" &&
                (payment.status === "PAID" ? (
                  <TableCell>Opłacono</TableCell>
                ) : (
                  <TableCell>
                    <Link href={`/offer/rent/${rentId}/payment/${payment.id}`}>
                      <Button variant={"outline"}>Opłać</Button>
                    </Link>
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

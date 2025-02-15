"use client";

import { Button } from "@/components/ui/button";
import { payForRent } from "@/lib/actions/lease-actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PayRentPage() {
  const paymentId = useParams().paymentId;
  const rentId = useParams().rentId;
  const router = useRouter();

  const handleRentPayment = async () => {
    try {
      await payForRent(paymentId);
      toast.success("Płatność została opłacona");
      router.replace(`/offer/rent/${rentId}/payment`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[90%] bg-background flex-1 p-5 flex overflow-hidden flex-col justify-center items-center">
      <form action={handleRentPayment}>
        <Button>Opłać</Button>
      </form>
    </div>
  );
}

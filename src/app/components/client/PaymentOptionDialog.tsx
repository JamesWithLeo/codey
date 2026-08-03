"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

const paymentOptions = [
  { value: "paypal", label: "PayPal" },
  { value: "gcash", label: "GCash" },
  { value: "googlepay", label: "Google Pay" },
  { value: "applepay", label: "Apple Pay" },
  { value: "creditcard", label: "Credit/Debit Card" },
];

export function PaymentOptionDialog({
  onConfirm,
  onCheckOut,
}: {
  onConfirm?: (option: string | null) => Promise<{
    success: boolean;
    message: string;
    id: string | null | undefined;
  }>;
  onCheckOut: () => void;
}) {
  const [selected, setSelected] = useState<string | null>("");
  const router = useRouter();

  const [opened, setOpened] = useState(false);
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <Button className={"w-full"} onClick={onCheckOut}>
        Proceed to payment
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Payment Option</DialogTitle>
          <DialogDescription>
            Please select your preferred payment method to proceed with
            checkout.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment method..." />
            </SelectTrigger>
            <SelectContent>
              {paymentOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant={"outline"}>Close</Button>} />
          <Button
            className=""
            size="lg"
            disabled={!selected}
            onClick={async () => {
              const result = await onConfirm?.(selected);
              if (result && result.success && result.id) {
                router.replace(`/orders/${result.id}`);
              }
              alert("Payment failed!");
            }}
          >
            Confirm & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

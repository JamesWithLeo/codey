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

const paymentOptions = [
  { value: "paypal", label: "PayPal" },
  { value: "gcash", label: "GCash" },
  { value: "googlepay", label: "Google Pay" },
  { value: "applepay", label: "Apple Pay" },
  { value: "creditcard", label: "Credit/Debit Card" },
];

export function PaymentOptionDialog({
  onConfirm,
}: {
  onConfirm?: (
    option: string | null,
  ) => Promise<{ success: boolean; message?: string } | undefined>;
}) {
  const [selected, setSelected] = useState<string | null>("");

  const [opened, setOpened] = useState(false);
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger
        render={<Button className={"w-full"}>Proceed to payment</Button>}
      />
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
              if (result && result.success) {
                alert("Payment successful!");
                setOpened(false);
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

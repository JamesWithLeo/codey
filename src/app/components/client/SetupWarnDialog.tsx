"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SetupWarnDialogProps {
  missingFields: Partial<{
    firstName: boolean;
    lastName: boolean;
    location: boolean;
    phoneNumber: boolean;
  }>;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export function SetupWarnDialog({
  missingFields,
  opened,
  setOpened,
}: SetupWarnDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle
              className="w-5 h-5 text-yellow-500"
              aria-hidden="true"
            />
            Incomplete Profile
          </DialogTitle>
          <DialogDescription>
            Please complete the following required information to continue:
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc pl-6 text-sm text-destructive">
          {missingFields.firstName && <li key={"firstName"}>First Name</li>}
          {missingFields.lastName && <li key={"lastName"}>Last name</li>}
          {missingFields.phoneNumber && (
            <li key={"phoneNumber"}>Phone number</li>
          )}
          {missingFields.location && <li key={"location"}>Location</li>}
        </ul>
        <DialogFooter>
          <DialogClose
            render={<Button variant="outline">Skip for now</Button>}
          />
          <Button
            size="lg"
            onClick={async () => {
              router.push("/profile");
            }}
            aria-label="Go to profile setup"
          >
            Go to Profile Setup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BellRing,
  Box,
  Clock3,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  ShoppingCart,
  CircleUserIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ProfileUser = {
  name?: string | null;
  email?: string | null;
  role?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

type Order = {
  id: string;
  title: string;
  status: string;
  amount: string;
  date: string;
  eta: string;
  progress: string;
};

const orders: Order[] = [
  {
    id: "ORD-2048",
    title: "Aurora Smart Lamp",
    status: "In transit",
    amount: "$149.00",
    date: "Today",
    eta: "Arrives in 2 days",
    progress: "Packed and scanned at the hub",
  },
  {
    id: "ORD-1984",
    title: "Studio Desk Organizer",
    status: "Preparing",
    amount: "$84.50",
    date: "Yesterday",
    eta: "Ready to ship",
    progress: "Awaiting final quality check",
  },
  {
    id: "ORD-1741",
    title: "Luna Noise Cancelling Headphones",
    status: "Delivered",
    amount: "$239.00",
    date: "Jun 21",
    eta: "Completed",
    progress: "Signed and received by you",
  },
];

const quickStats = [
  { label: "Orders", value: "0", icon: Box },
  { label: "Cart", value: "5", icon: ShoppingCart },
  { label: "Wishlist", value: "8", icon: BellRing },
];

export default function ProfileDashboard({ user }: { user: ProfileUser }) {
  const [form, setForm] = useState({
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName ? user.lastName : "",
    email: user.email ?? "",
    phone: "",
    location: "",
  });
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0]);
  const [saved, setSaved] = useState(false);

  const initials = useMemo(() => {
    const first = form.firstName?.[0] ?? "";
    const last = form.lastName?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }, [form.firstName, form.lastName]);

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <main className="min-h-full bg-background  text-foreground ">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 lg:p-6  md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 p-2  text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Member dashboard
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome back, {form.firstName}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Manage your account, keep track of orders, and update your
                personal details from one polished place.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Security
            </Button>
            <Button>
              <BellRing className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Card className="border-border bg-card p-4 text-card-foreground ">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg text-foreground">
                      Profile overview
                    </CardTitle>
                    <CardDescription className="mt-1 text-muted-foreground">
                      Your account snapshot and preferred contact details.
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Avatar size="lg">
                    {initials}
                    <AvatarFallback className={"bg-primary text-white"}>
                      <CircleUserIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {form.firstName} {form.lastName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user.email ?? "No email on file"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">{user.role ?? "Member"}</Badge>
                      <Badge variant="outline">Verified account</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {quickStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-secondary p-4"
                    >
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <stat.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{stat.label}</span>
                      </div>
                      <p className="mt-2 text-xl font-semibold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card p-4 text-card-foreground ">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  Account details
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update the details you want visible to support and shipping
                  teams.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      className="text-muted-foreground"
                      htmlFor="firstName"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      value={form.firstName}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          firstName: event.target.value,
                        }))
                      }
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground" htmlFor="lastName">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      value={form.lastName}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          lastName: event.target.value,
                        }))
                      }
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground" htmlFor="phone">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          phone: event.target.value,
                        }))
                      }
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground" htmlFor="location">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }))
                    }
                    className="bg-background"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {saved
                    ? "Saved — your preferences are up to date."
                    : "Changes apply instantly in your dashboard view."}
                </p>

                <Button onClick={handleSave}>Save changes</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border bg-card p-4 text-card-foreground ">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg text-foreground">
                      Orders & tracking
                    </CardTitle>
                    <CardDescription className="mt-1 text-muted-foreground">
                      Keep an eye on your latest purchases and delivery
                      progress.
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orders.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                        selectedOrder.id === order.id
                          ? "border-primary/40 bg-accent"
                          : "border-border bg-background hover:bg-accent/50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {order.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.id} • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {order.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.status}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <Separator className="bg-border" />

                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {selectedOrder.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedOrder.id}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {selectedOrder.status}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>{selectedOrder.eta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-primary" />
                      <span>{selectedOrder.progress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PackageCheck className="h-4 w-4 text-primary" />
                      <span>Priority support is ready for this shipment.</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t border-border pt-4">
                <Button variant="outline">
                  View all orders
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="w-full flex ">
              <Button size={"lg"} className={"w-full"}>
                Logout
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

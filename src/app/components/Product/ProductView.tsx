"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MinusIcon, Plus, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CLIENT_PRODUCT } from "@/src/types";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

type Props = {
  product: CLIENT_PRODUCT;
  slug: string[];
};

export default function ProductView({ product, slug }: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [errorCart, setErrorCart] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { data, error } = useSession();
  const { session, user } = { ...data };

  async function HandleAddToCart() {
    if (isAddingToCart) return;

    if (!session || !user) {
      router.push("/login", { scroll: false });
      return;
    }

    setIsAddingToCart(true);
    const newCartItem = { quantity: 1, product_id: product.id };
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id, item: newCartItem }),
    });
    const item = await response.json();

    if (item.ok) {
      setIsAddedToCart(true);
      setIsAddingToCart(false);
      setTimeout(() => {
        setIsAddedToCart(false);
        setQuantity(0);
      }, 5000);
    } else {
      if (item.maxCart) {
        setErrorCart(item.error);
        setTimeout(() => {
          setErrorCart(null);
          setQuantity(0);
        }, 10000);
      }

      setIsAddingToCart(false);
      console.log(item);
    }
  }

  async function HandleCheckOut() {
    if (!session || !user) {
      router.push("/login", { scroll: false });
      return;
    }
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-7xl min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex items-center flex-col px-4">
          <Image
            src={product.thumbnail}
            alt={`${product.name} Thumbnail`}
            height={200}
            width={200}
            priority
            className="w-full aspect-square lg:w-80 h-max sm:w-60 max-w-52 sm:max-w-80"
          />
        </div>

        <div className="flex flex-col gap-2  justify-center">
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <Badge variant="default">
            {slug.slice(0, -1).join(" > ") || "Products"}
          </Badge>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-3xl font-semibold text-foreground">
              ${product.price}
            </p>
            <p className="text-sm text-muted-foreground">
              Free shipping on orders over $50
            </p>
          </div>

          <p className="mt-5 text-sm text-justify leading-7 text-muted-foreground sm:text-base">
            {product.description}
          </p>

          <Separator className="my-6" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ButtonGroup className="w-fit">
              <Button
                variant="outline"
                size="icon-lg"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <MinusIcon size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                className="min-w-12 cursor-default bg-background"
              >
                {quantity}
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
              >
                <Plus size={18} />
              </Button>
            </ButtonGroup>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center gap-2 px-4 text-sm"
                onClick={HandleAddToCart}
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex items-center gap-2 px-4 text-sm"
                onClick={HandleCheckOut}
              >
                Checkout
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <Card className="mt-6 border-border/70 bg-card/80">
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Ready to ship
                </p>
                <p className="text-sm text-muted-foreground">
                  Secure checkout and fast delivery support.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Secure payment</Badge>
                <Badge variant="secondary">Fast dispatch</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

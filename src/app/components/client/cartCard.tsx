"use client";

import { product, CartItem } from "@/src/generated/prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CheckOutItem } from "@/src/types";

export default function CartCard({
  cartItem,
  onAdd,
  onRemove,
  onIncrement,
  onDecrement,
  onMark,
  isMarkingForDeletion,
}: {
  cartItem: CartItem;
  onAdd: (order: CheckOutItem) => void;
  onRemove: (order: CheckOutItem) => void;
  onIncrement: (order: CheckOutItem) => void;
  onDecrement: (order: CheckOutItem) => void;
  onMark: (id: string, type: "select" | "unselect") => void;
  isMarkingForDeletion: boolean;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [isMarking, setIsMarking] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const productLink = `/products/${product?.category}/${product?.id}`;

  function HandleIncrementQuantity(e: React.MouseEvent) {
    e.stopPropagation(); // Avoid triggering Card selection when marking for deletion
    if (!product) return;

    const nextQuantity = quantity + 1;
    const totalPrice = Number(product.price.toString()) * nextQuantity;

    // FIX: Using nextQuantity instead of stale state variables
    onIncrement({
      subtotal: totalPrice,
      quantity: nextQuantity + 1,
      product_id: product.id,
      pricePerUnit: Number(product.price),
      name: product.name,
    });
    setQuantity(nextQuantity);
  }

  function HandleDecrementQuantity(e: React.MouseEvent) {
    e.stopPropagation();
    if (!product || quantity <= 1) return;

    const nextQuantity = quantity - 1;
    const totalPrice = Number(product.price.toString()) * nextQuantity;

    onDecrement({
      subtotal: totalPrice,
      quantity: nextQuantity,
      product_id: product.id,
      name: product.name,
      pricePerUnit: Number(product.price.toString()),
    });
    setQuantity(nextQuantity);
  }

  // FIX: Controlled state handler instead of document.getElementById DOM lookup
  function HandleSelect(checked: boolean) {
    if (!product) return;
    setIsSelected(checked);

    const totalPrice = Number(product.price.toString()) * quantity;
    const payload = {
      subtotal: totalPrice,
      quantity: quantity,
      product_id: product.id,
      name: product.name,
      pricePerUnit: Number(product.price.toString()),
    };

    if (checked) {
      onAdd(payload);
    } else {
      onRemove(payload);
    }
  }

  function HandleMark() {
    if (isMarking) {
      onMark(cartItem.id, "unselect");
    } else {
      onMark(cartItem.id, "select");
    }
  }

  useEffect(() => {
    async function FetchProduct(id: number) {
      const response = await fetch(`/api/product/?id=${id}`);
      const data = await response.json();
      if (data.ok) {
        setProduct(data.product);
      }
    }
    FetchProduct(cartItem.product_id);
  }, [cartItem.product_id]);

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, []);

  if (!product) return <CartCardSkeleton />;

  return (
    <Card
      id={cartItem.id}
      className={`relative  p-2 max-w-full w-full min-h-40 transition-all rounded-md items-center grid grid-cols-4   lg:p-4 lg:gap-4 gap-1 text-xs cursor-pointer select-none ${
        isMarking && isMarkingForDeletion
          ? "bg-destructive/10 border border-destructive"
          : ""
      }`}
      onClick={() => {
        if (isMarkingForDeletion) {
          setIsMarking(!isMarking);
          HandleMark();
        } else {
          setIsMarking(false);
        }
      }}
    >
      {/* Product Image section */}
      <div className="grid grid-cols-1 relative    max-w-32  grid-rows-1   col-span-1">
        <Checkbox
          id={`check-${product.id}`}
          checked={isSelected}
          onCheckedChange={(checked) => HandleSelect(!!checked)}
          className={`h-5 w-5  absolute left-2 top-2  rounded-sm border-muted-foreground/60 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${isMarkingForDeletion && "hidden "}`}
        />
        <Image
          className="object-contain md:max-h-32  max-h-20 w-full max-w-full rounded-sm "
          src={product?.thumbnail ?? ""}
          width={200}
          height={200}
          alt={product?.name || "Product Image"}
          priority
        />
      </div>

      <div className="p-0 w-full flex flex-col h-full col-span-3  md:col-span-2 ">
        <div className="max-w-xs ">
          <h1
            className={`font-bold text-ellipsis   leading-tight lg:text-base text-sm  line-clamp-2 uppercase ${!isMarkingForDeletion && "hover:underline"} underline-offset-2`}
            onClick={() => {
              if (isMarkingForDeletion) return;
              router.push(productLink);
            }}
          >
            {product?.name}
          </h1>
        </div>
        <div className="flex flex-wrap flex-col gap-px space-x-4 text-sm font-medium">
          <code className="text-muted-foreground text-xs md:text-sm">
            BRAND: {product.brand.toUpperCase()}
          </code>
          <code className="text-muted-foreground text-xs md:text-sm">
            CATEGORY: {product.category.toUpperCase()}
          </code>
        </div>
        <div className="h-full  flex items-end gap-4">
          <p className="lg:text-lg text-xs   font-light text-foreground/80">
            ${Number(product.price).toFixed(2)}
          </p>
          <Badge variant={product.stock <= 0 ? "destructive" : "default"}>
            {product.stock} left in stock
          </Badge>
        </div>
      </div>

      <div className="flex  md:flex-col justify-end md:justify-between   items-center w-full h-full  col-span-4 md:col-span-1  flex-row">
        <CardContent
          className="p-0 flex  flex-row gap-1.5  w-full items-center  md:justify-end   justify-start col-span-1 "
          onClick={(e) => e.stopPropagation()}
        >
          {isMarkingForDeletion ? null : (
            <>
              <h2 className="text-sm lg:text-base font-bold text-foreground">
                ${(Number(product.price.toString()) * quantity).toFixed(2)}
              </h2>
              <h1 className="text-xs text-zinc-500">(Qty:{quantity})</h1>
            </>
          )}
        </CardContent>
        {isMarkingForDeletion ? null : (
          <CardContent className="flex items-center w-full    justify-end text-center h-9">
            <Button
              variant={"outline"}
              size="icon-xs"
              onClick={HandleDecrementQuantity}
              disabled={quantity === 1}
            >
              <Minus />
            </Button>
            <h1 className={"w-8 text-xs"}>{quantity}</h1>
            <Button
              variant={"outline"}
              size="icon-xs"
              onClick={HandleIncrementQuantity}
            >
              <Plus />
            </Button>
          </CardContent>
        )}
      </div>
    </Card>
  );
}

function CartCardSkeleton() {
  return (
    <Card className="max-w-full w-full min-h-32 grid grid-cols-5 p-4 gap-4 items-center rounded-md border border-muted">
      <div className="col-span-1 flex justify-center">
        <Skeleton className="w-20 h-20 rounded-md" />
      </div>
      <div className="col-span-2 space-y-2">
        <Skeleton className="w-full h-5 rounded-sm" />
        <Skeleton className="w-1/2 h-4 rounded-sm" />
        <Skeleton className="w-1/3 h-4 rounded-sm" />
      </div>
      <div className="col-span-1 flex justify-center">
        <Skeleton className="w-24 h-9 rounded-md" />
      </div>
      <div className="col-span-1 flex flex-col items-end gap-2">
        <Skeleton className="w-16 h-5 rounded-sm" />
        <Skeleton className="w-5 h-5 rounded-sm" />
      </div>
    </Card>
  );
}

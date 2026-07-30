"use client";
import { CartItem } from "@/src/generated/prisma/client";
import { useReducer, useState } from "react";
import CartCard from "./cartCard";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { CheckOutItem } from "@/src/types";
import { PaymentOptionDialog } from "@/src/app/components/client/PaymentOptionDialog";

enum SELECTED_ORDER_REDUCER {
  increment = "increment",
  decrement = "decrement",
  add = "add",
  remove = "remove",
  checkout = "checkout",
}

function selectedOrderReducer(
  state: CheckOutItem[],
  action: {
    type: SELECTED_ORDER_REDUCER;
    payload?: CheckOutItem;
  },
) {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_ORDER_REDUCER.add:
      if (!payload) return state;
      const existingOrder = state.find(
        (order) => order.product_id === payload.product_id,
      );
      if (!existingOrder) return [...state, { ...payload }];
      return state.map((order) =>
        order.product_id === existingOrder.product_id
          ? {
              ...order,
              subtotal: order.subtotal + order.pricePerUnit,
              quantity: order.quantity + 1,
            }
          : order,
      );
    case SELECTED_ORDER_REDUCER.increment:
      if (!payload) return state;
      return state.map((order) =>
        order.product_id === payload.product_id
          ? {
              ...order,
              subtotal: order.subtotal + order.pricePerUnit,
              quantity: order.quantity + 1,
            }
          : order,
      );

    case SELECTED_ORDER_REDUCER.decrement:
      if (!payload) return state;
      return state.reduce<CheckOutItem[]>((stayingOrder, order) => {
        if (order.product_id === payload.product_id) {
          if (order.quantity > 1) {
            stayingOrder.push({
              ...order,
              quantity: order.quantity - 1,
              subtotal: order.subtotal - payload.pricePerUnit,
            });
          } else {
            stayingOrder.push(order);
          }
        } else {
          stayingOrder.push(order);
        }
        return stayingOrder;
      }, []);
    case SELECTED_ORDER_REDUCER.remove:
      if (!payload) return state;
      return state.filter(
        (currentOrder) => currentOrder.product_id !== payload.product_id,
      );
    default:
      return state;
  }
}

export default function CartPanel({
  cartItem: cartItems,
}: {
  cartItem: CartItem[] | null;
}) {
  const [cart, setCart] = useState<CartItem[]>(cartItems ?? []);
  const [orders, dispatchOrder] = useReducer(selectedOrderReducer, []);
  const [isMarkingForDeletion, setIsMarkingForDeletion] =
    useState<boolean>(false);
  const [markForDeleteIds, setMarkForDeleteIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  function AddItem(order: CheckOutItem) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.add, payload: order });
  }
  function RemoveItem(order: CheckOutItem) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.remove, payload: order });
  }
  function IncrementItem(order: CheckOutItem) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.increment, payload: order });
  }
  function DecrementItem(order: CheckOutItem) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.decrement, payload: order });
  }

  async function HandleCheckOut(paymentMethod: string | null) {
    if (!paymentMethod) return;
    const response = await fetch("/api/order", {
      body: JSON.stringify(
        orders.map((order) => {
          const { name, pricePerUnit, ...newOrder } = order;
          return newOrder;
        }),
      ),
      method: "POST",
    });

    const result = await response.json();
    console.log(result);
  }

  function HandleMark(id: string, type: "select" | "unselect") {
    if (type === "select") {
      setMarkForDeleteIds((state) => [...state, id]);
    } else {
      setMarkForDeleteIds((state) =>
        state.filter((currentId) => currentId !== id),
      );
    }
  }

  async function HandleDeleteSelect() {
    if (isMarkingForDeletion && markForDeleteIds.length >= 1) {
      setIsDeleting(true);
      const response = await fetch(
        `/api/cart/?ids=${JSON.stringify(markForDeleteIds)}`,
        { method: "DELETE" },
      );
      const deletedResponse = await response.json();
      if (deletedResponse.ok) {
        setCart((state) =>
          state.filter((cart) => !markForDeleteIds.includes(cart.id)),
        );
        setMarkForDeleteIds([]);
        setIsMarkingForDeletion(false);
      }
      setIsDeleting(false);
    } else {
      setIsMarkingForDeletion(true);
    }
  }

  return (
    <section className="flex  flex-col lg:flex-row w-full   lg:grid-cols-[2fr_min-content_1fr] lg:grid-rows-[min-content_1fr] h-[calc(100vh-4rem)]- h-full  gap-4 overflow-hidden   lg:overflow-scroll">
      <section className="flex-1 w-full  flex flex-col pr-2   overflow-y-auto lg:overflow-y-scroll  ">
        <div className="flex h-min justify-between w-full items-center sticky top-0  py-2 bg-background z-10 ">
          <h1 className="font-semibold text-lg">
            {cart?.length} {cart?.length <= 1 ? "item" : "items"}
          </h1>
          <div className="flex gap-2">
            {isMarkingForDeletion ? (
              <>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={HandleDeleteSelect}
                >
                  {isDeleting ? (
                    <Spinner />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-1" />
                  )}
                  Delete selected
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsMarkingForDeletion(false);
                    setMarkForDeleteIds([]);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={HandleDeleteSelect}
                size="icon"
                variant="secondary"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full   ">
          {cart && cart.length
            ? cart.map((item) => (
                <CartCard
                  cartItem={item}
                  key={item.id}
                  onAdd={AddItem}
                  onRemove={RemoveItem}
                  onIncrement={IncrementItem}
                  onDecrement={DecrementItem}
                  onMark={HandleMark}
                  isMarkingForDeletion={isMarkingForDeletion}
                />
              ))
            : null}
        </div>
      </section>

      {/* ORDER SUMMARY CHECKOUT CONTAINER FIX: Locks permanently to viewport bottom on mobile */}
      <div className="lg:max-w-md w-full sticky bottom-0  left-0  lg:bottom-auto z-0  ">
        <Card className="w-full lg:sticky lg:top-0 flex flex-col  overflow-hidden ">
          {/* Hidden header on mobile to maximize room for items list */}
          <CardHeader className=" px-4 bg-muted/40 border-b hidden sm:block">
            <CardTitle className="text-base font-bold tracking-tight text-foreground">
              Order Summary
            </CardTitle>
          </CardHeader>

          {/* Content items tray: limits heights dynamically on desktop views */}
          <CardContent className="p-4 flex-1  flex-col min-h-0 hidden sm:flex">
            <div className="grid grid-cols-4 text-[11px] font-bold tracking-wider text-muted-foreground uppercase pb-2 mb-2 border-b border-muted">
              <span className="col-span-2">Item</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Amount</span>
            </div>

            <div className="flex flex-col gap-2 max-h-32 lg:max-h-64 overflow-y-auto pr-1">
              {orders.map((value) => (
                <div
                  className="grid grid-cols-4 text-sm items-center py-0.5 text-foreground/90 font-medium"
                  key={value.product_id}
                >
                  <span className="truncate col-span-2 text-xs md:text-sm pr-2">
                    {value.name}
                  </span>
                  <span className="text-center text-muted-foreground text-xs md:text-sm">
                    {value.quantity}
                  </span>
                  <span className="text-right font-semibold text-xs md:text-sm">
                    ${value.subtotal.toFixed(2)}
                  </span>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-xs text-center text-muted-foreground italic py-2">
                  No items selected for checkout
                </p>
              )}
            </div>
          </CardContent>

          <Separator className="bg-muted hidden sm:block" />

          <CardFooter className="p-4 flex flex-col gap-3 bg-muted/20">
            <div className="flex justify-between items-center w-full text-sm font-medium">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Items ({orders.length})
              </span>
              <span className="text-base font-bold text-foreground">
                Total: $
                {orders
                  .reduce((sum, item) => sum + item.subtotal, 0)
                  .toFixed(2)}
              </span>
            </div>

            <PaymentOptionDialog onConfirm={HandleCheckOut} />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

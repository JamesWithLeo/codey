"use client";
import { CartItem } from "@/src/generated/prisma/client";
import { useReducer, useState } from "react";
import CartCard from "./cartCard";
import { productType } from "./utils/validation";
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

enum SELECTED_ORDER_REDUCER {
  increment = "increment",
  decrement = "decrement",
  add = "add",
  remove = "remove",
}

function selectedOrderReducer(
  state: productType[],
  action: {
    type: SELECTED_ORDER_REDUCER;
    payload?: productType;
  },
) {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_ORDER_REDUCER.add:
      if (!payload) return state;
      const existingOrder = state.find((order) => order.id === payload.id);
      if (!existingOrder) return [...state, { ...payload }];
      return state.map((order) =>
        order.id === existingOrder.id
          ? {
              ...order,
              total_price: order.total_price + order.price,
              quantity: order.quantity + 1,
            }
          : order,
      );
    case SELECTED_ORDER_REDUCER.increment:
      if (!payload) return state;
      return state.map((order) =>
        order.id === payload.id
          ? {
              ...order,
              total_price: order.total_price + order.price,
              quantity: order.quantity + 1,
            }
          : order,
      );

    case SELECTED_ORDER_REDUCER.decrement:
      if (!payload) return state;
      return state.reduce<productType[]>((stayingOrder, order) => {
        if (order.id === payload.id) {
          if (order.quantity > 1) {
            stayingOrder.push({
              ...order,
              quantity: order.quantity - 1,
              total_price: order.total_price - payload.price,
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
      return state.filter((currentOrder) => currentOrder.id !== payload.id);
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

  function AddItem(order: productType) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.add, payload: order });
  }
  function RemoveItem(order: productType) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.remove, payload: order });
  }
  function IncrementItem(order: productType) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.increment, payload: order });
  }
  function DecrementItem(order: productType) {
    dispatchOrder({ type: SELECTED_ORDER_REDUCER.decrement, payload: order });
  }
  function HandleCheckOut() {
    console.log(orders);
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
    if (isMarkingForDeletion && markForDeleteIds.length) {
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
    <div className="w-full max-w-7xl ">
      {/* MAIN CONTAINER FIX: 
        On mobile, we enforce a locked structural viewport height (h-[calc(100vh-4rem)]) 
        and turn off global browser scrolling so components partition correctly. 
      */}
      <section className="flex flex-col lg:grid lg:grid-cols-[2fr_min-content_1fr] h-[calc(100vh-6rem)] lg:h-auto gap-4 overflow-hidden  lg:overflow-visible">
        {/* PRODUCT COLUMN FIX: Grows to fill remaining space on mobile and scrolls internally */}
        <section className="flex-1 flex flex-col gap-2 min-h-0 overflow-y-auto lg:overflow-visible  pr-1">
          <div className="flex h-min justify-between items-center sticky top-0 bg-background z-20 pb-2">
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

          <div className="flex flex-col gap-4">
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

        <Separator orientation="vertical" className="hidden lg:block" />

        {/* ORDER SUMMARY CHECKOUT CONTAINER FIX: Locks permanently to viewport bottom on mobile */}
        {/* div className="w-full sticky bottom-0 left-0 bg-background pt-2 pb-4 lg:pb-0 lg:pt-0 lg:relative lg:bottom-auto z-30 border-t lg:border-t-0 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.12)] lg:shadow-none"> */}
        <div className="w-full sticky bottom-0  left-0  lg:bottom-auto z-20  ">
          <Card className="w-full lg:sticky lg:top-17 flex flex-col  overflow-hidden ">
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
                    key={value.id}
                  >
                    <span className="truncate col-span-2 text-xs md:text-sm pr-2">
                      {value.name}
                    </span>
                    <span className="text-center text-muted-foreground text-xs md:text-sm">
                      {value.quantity}
                    </span>
                    <span className="text-right font-semibold text-xs md:text-sm">
                      ${value.total_price.toFixed(2)}
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
                    .reduce((sum, item) => sum + item.total_price, 0)
                    .toFixed(2)}
                </span>
              </div>

              <Button
                onClick={HandleCheckOut}
                disabled={orders.length === 0}
                className="w-full font-bold shadow-sm"
                variant="default"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}

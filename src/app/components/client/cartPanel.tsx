"use client";
import { CartItem } from "@prisma/client";
import { useReducer, useState } from "react";
import CartCard from "./cartCard";
import { productType } from "./utils/validation";
import React from "react";

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

      return state.reduce<productType[]>((stayingOrder, order, index) => {
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
        }
        return stayingOrder;
      }, []);
    case SELECTED_ORDER_REDUCER.remove:
      if (!payload) return state;
      return state.filter((currentOrder) => currentOrder.id !== payload.id);
  }
}
export default function CartPanel({
  cartItem: cartItems,
}: {
  cartItem: CartItem[] | null;
}) {
  const [orders, dispatchOrder] = useReducer(selectedOrderReducer, []);
  const [isMarkingForDeletion, setIsMarkingForDeletion] =
    useState<boolean>(false);
  const [markForDeleteIds, setMarkForDeleteIds] = useState<string[]>([]);

  function AddItem(order: productType) {
    dispatchOrder({
      type: SELECTED_ORDER_REDUCER.add,
      payload: order,
    });
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
      const response = await fetch(
        `/api/cart/?ids=${JSON.stringify(markForDeleteIds)}`,
        {
          method: "DELETE",
        },
      );
      const deletedResponse = await response.json();
      if (deletedResponse.ok) {
        setIsMarkingForDeletion(false);
        markForDeleteIds.forEach((id) => {
          const cartItem = document.getElementById(id);
          cartItem?.remove();
        });
        setMarkForDeleteIds([]);
      } else {
        console.log(deletedResponse);
      }
    } else {
      setIsMarkingForDeletion(true);
    }
  }

  return (
    <>
      <section className="grid grid-rows-3 grid-cols-1 min-h-dvh w-full  max-w-7xl gap-4 sm:grid-cols-3 sm:grid-rows-1">
        <div className="h-max w-full row-span-2 sm:col-span-2 sm:row-span-1 flex-col grid grid-cols-1  ">
          {cartItems && cartItems.length
            ? cartItems.map((item) => {
                return (
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
                );
              })
            : null}
        </div>

        <div className="w-full min-h-full flex flex-col gap-2 h-full p-2">
          <span className="flex gap-2">
            <button
              onClick={HandleDeleteSelect}
              className={`btn btn-sm btn-square   ${isMarkingForDeletion ? "btn-error text-white" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
              </svg>
            </button>
            {isMarkingForDeletion ? (
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setIsMarkingForDeletion(false);
                  setMarkForDeleteIds([]);
                }}
              >
                cancel
              </button>
            ) : null}
          </span>
          <div className="bg-gray-200 rounded flex flex-col justify-between h-full p-2 w-full">
            <h1 className="font-bold">Order Summary</h1>
            <div className="h-full">
              <div className="grid grid-cols-4 grid-rows-1">
                <h1 className="col-span-2">ITEM</h1>
                <h1 className="text-center">QTY</h1>
                <h1 className="text-right">AMOUNT</h1>
              </div>
              {orders.map((value) => {
                return (
                  <div className="grid grid-cols-4 grid-rows-1" key={value.id}>
                    <h1 className="truncate col-span-2">{value.name}</h1>
                    <h1 className="text-center">{value.quantity}</h1>
                    <h1 className="text-right">
                      {value.total_price.toFixed(2)}
                    </h1>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center">
              <h1>Items {orders.length}</h1>
              <button onClick={HandleCheckOut} className="btn btn-sm">
                Check out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

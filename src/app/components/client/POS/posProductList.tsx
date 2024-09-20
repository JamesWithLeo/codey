"use client";
import { Category } from "@prisma/client";
import PosProductCard from "./posProductCad";
import { useEffect, useReducer, useState } from "react";
import PosSelectedProduct from "./posSelectedProductCard";
import { getSession } from "next-auth/react";

type productType = {
  id: number;
  name: string;
  price: number;
  brand: string;
  total_price: number;
  quantity: number;
};
enum SELECTED_PRODUCT_REDUCER {
  increment = "increment",
  decrement = "decrement",
  VOID = "VOID",
}
enum TOTAL_REDUCER {
  increment = "increment",
  decrement = "decrement",
  VOID = "VOID",
}
function omit<T extends object, K extends keyof T>(
  obj: T,
  keysToRemove: K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToRemove.includes(key as K)),
  ) as Omit<T, K>;
}
export default function PosProductList({
  serializedProduct,
}: {
  serializedProduct: productType[];
}) {
  const [selectedProduct, dispatchProduct] = useReducer(selectedReducer, []);
  const [currentTotal, dispatchTotal] = useReducer(totalReducer, 0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  function selectedReducer(
    state: productType[],
    action: {
      type: SELECTED_PRODUCT_REDUCER;
      payload?: productType;
    },
  ) {
    const { type, payload } = action;
    switch (type) {
      case SELECTED_PRODUCT_REDUCER.increment:
        if (!payload) return state;

        const existingProduct = state.find(
          (product) => product.id === payload.id,
        );
        // add as initial, increment the price and quantity accordingly if existed
        if (!existingProduct) return [...state, { ...payload }]; // return initial
        return state.map((product) =>
          product.id === existingProduct.id
            ? {
                ...product,
                quantity: product.quantity + 1,
                total_price: payload.total_price + payload.price,
              }
            : product,
        );

      case SELECTED_PRODUCT_REDUCER.decrement:
        if (!payload) return state;

        return state.reduce<productType[]>((stayingProduct, product) => {
          if (product.id === payload.id) {
            if (product.quantity > 1) {
              // Reduce quantity but do not remove the product
              stayingProduct.push({
                ...product,
                quantity: product.quantity - 1,
                total_price: product.total_price - product.price,
              });
            }
            // Optionally handle removing the product if quantity reaches 0
          } else {
            stayingProduct.push(product);
          }
          return stayingProduct;
        }, []);

      case SELECTED_PRODUCT_REDUCER.VOID:
        return [];
      default:
        return state;
    }
  }

  function totalReducer(
    state: number,
    action: { type: TOTAL_REDUCER; payload?: number },
  ) {
    const { type, payload } = action;
    switch (type) {
      case TOTAL_REDUCER.increment:
        if (!payload) return state;
        return state + payload;
      case TOTAL_REDUCER.decrement:
        if (!payload) return state;
        return state - payload;
      case TOTAL_REDUCER.VOID:
        return 0;
      default:
        return state;
    }
  }

  function HandleAddToTerminal(product: productType) {
    dispatchProduct({
      type: SELECTED_PRODUCT_REDUCER.increment,
      payload: product,
    });
    dispatchTotal({
      type: TOTAL_REDUCER.increment,
      payload: product.price,
    });
  }

  function HandleRemoveFromTerminal(toRemoveProduct: productType) {
    dispatchProduct({
      type: SELECTED_PRODUCT_REDUCER.decrement,
      payload: toRemoveProduct,
    });
    dispatchTotal({
      type: TOTAL_REDUCER.decrement,
      payload: toRemoveProduct.price,
    });
  }
  function HandleProcess() {
    if (currentTotal !== 0 || selectedProduct.length !== 0) {
      // console.log(currentTotal);
      // console.log(selectedProduct);
      HandleCreateReceipt();
    }
  }
  async function HandleCreateReceipt() {
    const session = await getSession();
    const toOrderProduct = selectedProduct.map((value) => {
      return omit(value, ["name", "price", "brand"]);
    });
    const response = await fetch("/api/pos", {
      method: "POST",
      body: JSON.stringify({ orders: toOrderProduct, id: session?.user?.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const checkOutProduct = await response.json();

    console.log("checkout:", checkOutProduct);
  }
  function HandleVoid() {
    dispatchProduct({ type: SELECTED_PRODUCT_REDUCER.VOID });
    dispatchTotal({ type: TOTAL_REDUCER.VOID });
  }
  function HandleMaximize() {
    setIsFullscreen(true);
    const main_pos = document.getElementById("main_pos") as HTMLElement;
    document.body.style.overflowY = "hidden";
    main_pos.style.position = "fixed";
    main_pos.style.zIndex = "50";
    main_pos.style.padding = "1rem";
  }

  function HandleMinimize() {
    setIsFullscreen(false);
    const main_pos = document.getElementById("main_pos") as HTMLElement;
    document.body.style.overflowY = "scroll";
    main_pos.style.zIndex = "0";
    main_pos.style.position = "relative";
    main_pos.style.padding = "0";
  }
  useEffect(() => {}, [selectedProduct]);
  return (
    <main
      className="flex justify-between md:flex-row flex-col left-0 top-0 md:gap-4 gap-2 bg-white w-full h-full "
      id="main_pos"
    >
      <section className="md:w-1/2 h-2/5 md:h-full gap-2 flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="label-text-alt">Product</span>
          <input
            className="input input-bordered input-xs w-full"
            placeholder="Hammer"
          />
          {!isFullscreen ? (
            <button
              className="p-1 bg-gray-100 rounded h-max text-contrast"
              onClick={HandleMaximize}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M220,48V88a12,12,0,0,1-24,0V60H168a12,12,0,0,1,0-24h40A12,12,0,0,1,220,48ZM88,196H60V168a12,12,0,0,0-24,0v40a12,12,0,0,0,12,12H88a12,12,0,0,0,0-24Zm120-40a12,12,0,0,0-12,12v28H168a12,12,0,0,0,0,24h40a12,12,0,0,0,12-12V168A12,12,0,0,0,208,156ZM88,36H48A12,12,0,0,0,36,48V88a12,12,0,0,0,24,0V60H88a12,12,0,0,0,0-24Z"></path>
              </svg>
            </button>
          ) : (
            <button
              className="p-1 bg-gray-200 rounded h-max text-contrast"
              onClick={HandleMinimize}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M148,96V48a12,12,0,0,1,24,0V84h36a12,12,0,0,1,0,24H160A12,12,0,0,1,148,96ZM96,148H48a12,12,0,0,0,0,24H84v36a12,12,0,0,0,24,0V160A12,12,0,0,0,96,148Zm112,0H160a12,12,0,0,0-12,12v48a12,12,0,0,0,24,0V172h36a12,12,0,0,0,0-24ZM96,36A12,12,0,0,0,84,48V84H48a12,12,0,0,0,0,24H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Z"></path>
              </svg>
            </button>
          )}
        </div>
        <div className="border w-full h-full rounded overflow-y-scroll to-gray-400 ">
          {serializedProduct.map((value) => {
            return (
              <PosProductCard
                product={value}
                onAdd={HandleAddToTerminal}
                key={value.id}
              />
            );
          })}
        </div>
      </section>

      <section className="md:w-1/2 h-3/5 md:h-full flex flex-col border rounded">
        <div className="border-b px-2 py-1">
          <span className="grid h-full grid-cols-6 text-xs justify-items-center">
            <div className="col-span-3 w-full h-full">
              <h1>Item</h1>
            </div>
            <div className="w-full h-full">
              <h1>quantity</h1>
            </div>
            <div className="w-full h-full">
              <h1>price</h1>
            </div>
          </span>
        </div>
        <div className="w-full h-full row-span-9 row-start-2 overflow-y-scroll">
          {selectedProduct?.map((value) => {
            return (
              <PosSelectedProduct
                key={value.id}
                product={value}
                onIncrement={HandleAddToTerminal}
                onDecrement={HandleRemoveFromTerminal}
              />
            );
          })}
        </div>
        <div className="border-y px-2 py-1">
          <span className="grid h-full grid-cols-6 text-xs justify-items-center">
            <div className="col-span-3 w-full h-full">
              <h1>total</h1>
            </div>
            <div className="w-full h-full col-start-6">
              <h1>${currentTotal.toFixed(2)}</h1>
            </div>
          </span>
        </div>
        <div className="flex gap-4 justify-end  row-start-11 px-2 py-1">
          <button
            className="btn btn-xs bg-contrast text-white"
            onClick={HandleVoid}
          >
            void
          </button>
          <button
            className="btn btn-xs bg-primary"
            onClick={HandleProcess}
            disabled={selectedProduct.length === 0 || currentTotal === 0}
          >
            Process
          </button>
        </div>
      </section>
    </main>
  );
}

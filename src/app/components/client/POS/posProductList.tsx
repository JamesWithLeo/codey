"use client";
import PosProductCard from "./posProductCad";
import { useEffect, useReducer, useState } from "react";
import PosSelectedProduct from "./posSelectedProductCard";
import { getSession } from "next-auth/react";
import { omit } from "../utils/omit";
import { isOrderValidForPOS } from "../utils/validation";

interface productType {
  id: number;
  name: string;
  price: number;
  brand: string;
  total_price: number;
  quantity: number;
}
enum SELECTED_PRODUCT_REDUCER {
  increment = "increment",
  decrement = "decrement",
  VOID = "VOID",
}

type errorType = {
  error: string;
  logs: any[];
};

enum TOTAL_REDUCER {
  increment = "increment",
  decrement = "decrement",
  VOID = "VOID",
}

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
export default function PosProductList({
  serializedProduct,
}: {
  serializedProduct: productType[];
}) {
  const [selectedProduct, dispatchProduct] = useReducer(selectedReducer, []);
  const [currentTotal, dispatchTotal] = useReducer(totalReducer, 0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [errorLogs, setErrorLogs] = useState<errorType | null>(null);

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
      HandleCreateReceipt();
    }
  }

  async function PostPosOrder() {
    const toOrderProduct = selectedProduct.map((value) => {
      return omit(value, ["price", "brand"]);
    });
    const isValid = toOrderProduct.every((product) =>
      isOrderValidForPOS(product),
    );
    if (!isValid) {
      const errorMessage: errorType = {
        error: "Product may contains invalid values",
        logs: [],
      };
      setErrorLogs(errorMessage);
      throw new Error("Product may contains invalid values");
    }

    return fetch("/api/pos", {
      method: "POST",
      body: JSON.stringify({ orders: toOrderProduct }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error:");
      }
      return response.json();
    });
  }

  async function ReduceItem() {
    const toOrderProduct = selectedProduct.map((value) => {
      return omit(value, ["name", "price", "brand", "total_price"]);
    });
    return fetch("/api/product", {
      method: "PUT",
      body: JSON.stringify(toOrderProduct),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("error!");
      }
      return response.json();
    });
  }

  async function HandleCreateReceipt() {
    setIsLoading(true);
    document.body.style.overflowY = "hidden";
    const post = PostPosOrder();
    post
      .then(async (transaction) => {
        if (!transaction || !transaction.ok) {
          console.log("transaction failed.");
          console.log("error:", transaction.error);
          return;
        } else {
          const logs = await ReduceItem();
          if (!logs || !logs.ok) {
            console.log("failed updating products stocks and sales");
          } else {
            HandleVoid();
          }
        }
        document.body.style.overflowY = "scroll";
        setIsLoading(false);
      })
      .catch((reason) => {
        console.log(reason);
        document.body.style.overflowY = "scroll";
        setIsLoading(false);
      });
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
    main_pos.style.zIndex = "20";
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

  function HandleCloseModal() {
    setIsSuccess(false);
  }
  useEffect(() => {}, [selectedProduct]);
  return (
    <>
      {isLoading ? (
        <div className="overflow-y-hidden bg-gray-700 bg-opacity-50 flex items-center justify-center h-dvh fixed left-0 top-0 w-full z-50">
          <div className="loading loading-dots loading-lg bg-primary" />
        </div>
      ) : null}

      {isSuccess ? (
        <div
          className="alert left-1/2 h-min md:w-1/2 top-4 md:bottom-4 md:top-auto md:left-4 -translate-x-1/2 md:-translate-x-0 4 alert-success fixed w-[96%] shadow-lg z-50"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
          </svg>
          <h1>Purchase has been confirmed!</h1>
          <div className="flex gap-2">
            <button className="btn btn-sm">view receipt</button>
            <button className="btn btn-sm btn-ghost" onClick={HandleCloseModal}>
              close
            </button>
          </div>
        </div>
      ) : null}

      {errorLogs ? (
        <div
          className="alert left-1/2 h-min md:w-1/2 top-4 md:bottom-4 md:top-auto md:left-4 -translate-x-1/2 md:-translate-x-0 4 alert-error fixed w-[96%] shadow-lg z-30"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
          </svg>
          <h1>Unexpected Error!</h1>
          <div>
            <button
              className="btn btn-sm text-sm"
              onClick={() => {
                (
                  document.getElementById("errorModal") as HTMLDialogElement
                ).showModal();
              }}
            >
              view logs
            </button>
            <button
              onClick={() => {
                setErrorLogs(null);
              }}
            >
              close
            </button>
          </div>
        </div>
      ) : null}

      <>
        <dialog id="errorModal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h1>{errorLogs?.error}</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </div>
        </dialog>
      </>

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
    </>
  );
}

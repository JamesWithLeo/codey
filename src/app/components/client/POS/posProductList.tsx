"use client";

import { Category } from "@prisma/client";
import PosProductCard from "./posProductCad";
import { useState } from "react";
import PosSelectedProduct from "./posSelectedProductCard";

type productType = {
  id: number;
  name: string;
  category: Category;
  price: number;
  description: string;
  thumbnail: string;
  stock: number;
  brand: string;
  isFeatured: boolean;
  quantity: number;
};
export default function PosProductList({
  serializedProduct,
}: {
  serializedProduct: productType[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<productType[]>();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  function HandleAddToTerminal(product: productType) {
    console.log(selectedProduct?.includes(product));
    if (selectedProduct?.includes(product)) {
      setSelectedProduct((prevProducts) =>
        (prevProducts || []).map((value) => {
          if (value.id === product.id) {
            return { ...value, quantity: value.quantity++ };
          }
          return value;
        }),
      );
    } else {
      setSelectedProduct((prevProducts) => [...(prevProducts || []), product]);
    }

    console.log(selectedProduct);
  }
  function HandleRemoveFromTerminal(id: number) {
    setSelectedProduct((prevProducts) =>
      prevProducts?.filter((product) => product.id !== id),
    );
  }
  function HandleCreateReceipt() {
    console.log(selectedProduct);
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
  return (
    <main
      className="flex justify-between left-0 top-0 gap-4 bg-white w-full h-full"
      id="main_pos"
    >
      <section className="w-1/2 gap-2 flex flex-col">
        <label className="form-control w-full">
          <div className="label justify-start gap-2">
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
            <span className="label-text-alt">Product</span>
          </div>
          <input className="input input-bordered" placeholder="Hammer" />
        </label>
        <div className="border w-full h-full rounded overflow-y-scroll">
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

      <section className="w-1/2 flex flex-col border rounded">
        <div className="border-b px-2 py-1">
          <span className="grid h-full grid-cols-6 text-xs justify-items-center">
            <div className="col-span-3 w-full h-full">
              <h1>Item</h1>
            </div>
            <div className="w-full h-full">
              <h1>price</h1>
            </div>
            <div className="w-full h-full">
              <h1>quantity</h1>
            </div>
          </span>
        </div>
        <div className="w-full h-full row-span-9 row-start-2 overflow-y-scroll">
          {selectedProduct?.map((value) => {
            return (
              <PosSelectedProduct
                key={value.id}
                product={value}
                onRemove={HandleRemoveFromTerminal}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-center row-start-11 px-2">
          <button className="btn self-end btn-sm bg-primary">Process</button>
        </div>
      </section>
    </main>
  );
}

"use client";

import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
type product = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  thumbnail: string;
  stock: number;
  brand: string;
  isFeatured: boolean;
};
export default function BuyConfirmation({
  product,
  onConfirm,
}: {
  product: product;
  onConfirm: () => void;
}) {
  return (
    <>
      <button
        className="btn bg-primary w-1/2 border-none sm:w-max shadow"
        onClick={() => {
          (document.getElementById("modal") as HTMLDialogElement).showModal();
        }}
      >
        Buy
      </button>
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">Confirmation Purchase</h3>
          <div className="flex justify-between">
            <div className="w-1/2 flex items-center justify-center">
              <Image
                className=""
                alt=""
                height={100}
                width={100}
                src={product.thumbnail}
              />
            </div>
            <div className="w-1/2">
              <h1>-{product.name}</h1>
              <h1>-{product.brand}</h1>
            </div>
          </div>
          <div className="modal-action ">
            <button className="btn bg-primary" onClick={onConfirm}>
              Confirm
            </button>
            <form method="dialog" className="flex gap-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

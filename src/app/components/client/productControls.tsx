"use client";
import BuyConfirmation from "./buyConfirmation";
import { getSession } from "next-auth/react";
import { useState } from "react";
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

export default function ProductControls({ product }: { product: product }) {
  const [quantity, setQuantity] = useState<number>(1);

  async function HandlePurchase() {
    const session = await getSession();
    if (!session || !session.user) return;

    const user_id = session.user.id;
    const product_id = product.id;
    const newOrder = {
      user_id,
      product_id,
      quantity,
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const insertedOrder = await response.json();
    console.log("purchased", insertedOrder);
  }
  return (
    <>
      <div className="px-4 py-2 w-full flex flex-col gap-2">
        <div className="flex">
          <div className="border rounded-md flex items-center gap-1 p-1">
            <span className="px-1">{quantity}</span>
            <button
              className="btn btn-xs"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
              </svg>
            </button>
            <button
              disabled={quantity === 1}
              className="btn btn-xs btn-ghost"
              onClick={() => {
                if (quantity > 1) setQuantity(quantity - 1);
                return;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#333333"
                viewBox="0 0 256 256"
              >
                <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <button className="btn w-1/2 sm:w-max border-none shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
            </svg>
            Add to cart
          </button>

          <BuyConfirmation product={product} onConfirm={HandlePurchase} />
        </div>
      </div>
    </>
  );
}

"use client";
import BuyConfirmation from "./buyConfirmation";
import { getSession } from "next-auth/react";
import React from "react";
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
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  async function HandlePurchase() {
    const session = await getSession();
    if (!session || !session.user) return;

    const user_id = session.user.id;
    const product_id = product.id;
    const total_price = Number(product.price) * quantity;
    const newOrder = {
      total_price,
      user_id,
      product_id,
      quantity,
    };
    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const insertedOrder = await response.json();
    console.log("purchased:", insertedOrder);
  }
  async function HandleAddToCart() {
    const session = await getSession();
    if (!session || !session.user) return;
    const newCartItem = { quantity, product_id: product.id };
    const user_id = session.user.id;
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ user_id, item: newCartItem }),
    });
    const item = await response.json();
    if (item.ok) {
      setIsAddedToCart(true);
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 5000);
    }
    console.log(item);
  }
  return (
    <>
      {isAddedToCart ? (
        <div
          role="alert"
          className="alert shadow-lg text-primary z-10 fixed bottom-8 right-4 w-max"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Item added to cart! </span>
          <button
            className="btn btn-square btn-xs"
            onClick={() => {
              setIsAddedToCart(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
        </div>
      ) : null}

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
          <button
            className="btn w-1/2 sm:w-max border-none shadow"
            onClick={HandleAddToCart}
          >
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

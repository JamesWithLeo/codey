"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { getSession } from "next-auth/react";
import { useState } from "react";

interface IProduct {
  id: number;
  name: string;
  category: Category;
  price: string;
  description: string;
  thumbnail: string;
  otherUrl: string[];
  brand: string;
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  sales: number;
}

export default function Card({ data: product }: { data: IProduct }) {
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  function HandleViewProduct() {
    router.push(`/p/${product.id}/`);
  }

  async function HandleAddToCart() {
    const session = await getSession();
    if (!session || !session?.user) {
      router.replace("/login");
      return;
    } else {
      const newCartItem = { quantity: 1, product_id: product.id };
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ user_id: session.user.id, item: newCartItem }),
      });
      const item = await response.json();
      if (item.ok) {
        setIsAddedToCart(true);
        setTimeout(() => {
          setIsAddedToCart(false);
        }, 5000);
      } else {
        console.log("Item not added!");
        console.log(item);
      }
    }
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

      <section
        className="card card-compact w-full max-h-96 h-full border rounded-sm hover:shadow-md border-gray-100 "
        id={product.id.toString()}
        onClick={(event) => {
          if ((event.target as HTMLElement).id !== product.id.toString()) {
            HandleViewProduct();
          }
        }}
      >
        <figure>
          <Image
            src={product.thumbnail}
            width={1000}
            height={1000}
            alt=""
            priority
          />
        </figure>
        <div className="p-2 md:p-4">
          <h1 className="card-title md:text-md">{product.name}</h1>
          <h1>${parseFloat(product.price).toFixed(2)}</h1>
          <div className="card-actions justify-end ">
            <button
              className="btn h-8 btn-xs "
              onClick={HandleAddToCart}
              id={product.id.toString()}
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

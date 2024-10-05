"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

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
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [errorCart, setErrorCart] = useState<string | null>(null);
  function HandleViewProduct() {
    router.push(`/p/${product.id}/`);
  }

  async function HandleAddToCart() {
    if (isAddingToCart) return;

    const session = await getSession();
    if (!session || !session?.user) {
      router.replace("/login");
      return;
    }

    setIsAddingToCart(true);
    const newCartItem = { quantity: 1, product_id: product.id };
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ user_id: session.user.id, item: newCartItem }),
    });
    const item = await response.json();

    if (item.ok) {
      setIsAddedToCart(true);
      setIsAddingToCart(false);
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 5000);
    } else {
      if (item.maxCart) {
        setErrorCart(item.error);
        setTimeout(() => {
          setErrorCart(null);
        }, 10000);
      }

      setIsAddingToCart(false);
      console.log(item);
    }
  }

  return (
    <>
      {errorCart !== null ? (
        <div
          role="alert"
          className="alert shadow-sm alert-warning w-full max-w-sm -translate-x-1/2 left-1/2 text-white border-none z-10 fixed sm:bottom-8 top-4 sm:top-auto sm:right-4 sm:w-max flex flex-col gap-1 p-3 sm:p-4 sm:gap-2  sm:left-auto sm:-translate-x-0"
        >
          <div className="text-xs text-wrap justify-between text-gray-600 min-h-max h-10 w-full flex items-center gap-2 sm:gap-4">
            <span className="flex gap-2 sm:gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"></path>
              </svg>
              <h1 className="w-52 text-wrap">{errorCart}</h1>
            </span>
            <button
              className="btn btn-square text-gray-600 btn-xs btn-ghost "
              onClick={() => {
                setErrorCart(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>
          </div>
          <button
            onClick={() => {
              setErrorCart(null);
              router.replace("/cart");
            }}
            className="border-b-2 border-gray-600 font-normal text-gray-600 text-sm self-end"
          >
            Manage Cart
          </button>
        </div>
      ) : null}

      {isAddedToCart ? (
        <div
          role="alert"
          className="alert shadow-sm flex flex-col -translate-x-1/2 left-1/2 w-full max-w-sm top-4 alert-success h-max sm:left-auto sm:-translate-x-0 sm:top-auto text-white border-none z-10 fixed sm:bottom-8 sm:right-4 gap-2 sm:w-max"
        >
          <div className="text-xs text-wrap justify-between min-h-max h-10 w-full flex items-center gap-2 md:gap-4">
            <span className="flex gap-2 md:gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#f2f2f2"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"></path>
              </svg>
              Item has been added to your cart.
            </span>
            <button
              className="btn btn-square btn-xs btn-ghost"
              onClick={() => {
                setIsAddedToCart(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>
          </div>
          <button
            className="border-b-2 font-normal  text-sm self-end"
            onClick={() => {
              setIsAddedToCart(false);
              router.push("/cart");
            }}
          >
            View Cart
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
              className={`btn h-8 btn-xs ${isAddingToCart ? "cursor-progress" : ""}`}
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

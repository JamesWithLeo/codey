"use client";

import { CartItem, product } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { productType } from "./utils/validation";
import React from "react";

export default function CartCard({
  cartItem,
  onAdd,
  onRemove,
  onIncrement,
  onDecrement,
  onMark,
  isMarkingForDeletion,
}: {
  cartItem: CartItem;
  onAdd: (order: productType) => void;
  onRemove: (order: productType) => void;
  onIncrement: (order: productType) => void;
  onDecrement: (order: productType) => void;
  onMark: (id: string, type: "select" | "unselect") => void;
  isMarkingForDeletion: boolean;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<product | null>(null);
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);
  const [isMarking, setIsMarking] = useState<boolean>(false);

  function HandleIncrementQuantity() {
    if (!product) return;
    const totalPrice = Number(product.price.toString()) * quantity;
    onIncrement({
      total_price: totalPrice,
      quantity: quantity,
      id: product.id,
      name: product.name,
      price: Number(product.price.toString()),
      brand: product.brand,
    });
    setQuantity((state) => state + 1);
    console.log("Quantity Increment!", quantity);
  }
  function HandleDecrementQuantity() {
    if (!product) return;
    const totalPrice = Number(product.price.toString()) * quantity;
    if (quantity > 1) {
      onDecrement({
        total_price: totalPrice,
        quantity: quantity,
        id: product.id,
        name: product.name,
        price: Number(product.price.toString()),
        brand: product.brand,
      });
      setQuantity((state) => state - 1);
      console.log("Quantity Decrement!", quantity);
    }
  }

  function HandleSelect() {
    if (!product) return;
    const productCheckbox = document.getElementById(
      product.id.toString(),
    ) as HTMLInputElement;
    const totalPrice = Number(product.price.toString()) * quantity;
    if (productCheckbox.checked) {
      onAdd({
        total_price: totalPrice,
        quantity: quantity,
        id: product.id,
        name: product.name,
        price: Number(product.price.toString()),
        brand: product.brand,
      });
    } else {
      onRemove({
        total_price: totalPrice,
        quantity: quantity,
        id: product.id,
        name: product.name,
        price: Number(product.price.toString()),
        brand: product.brand,
      });
    }
  }
  function HandleMark() {
    if (isMarking) {
      onMark(cartItem.id, "unselect");
    } else {
      onMark(cartItem.id, "select");
    }
  }
  useEffect(() => {
    async function FetchProduct(id: number) {
      const response = await fetch(`/api/product/?id=${id}`);
      const data = await response.json();
      if (data.ok) {
        setProduct(data.product);
      }
    }
    FetchProduct(cartItem.product_id);
  }, []);

  return (
    <>
      {product ? (
        <div
          className={`max-w-full w-full min-h-32 h-full border-t rounded-sm  ${isMarking && isMarkingForDeletion ? "bg-red-50" : ""} border-gray-100 grid-cols-5 grid`}
          id={cartItem.id}
          onClick={(event) => {
            if (isMarkingForDeletion) {
              setIsMarking(!isMarking);
              console.log(isMarking);
              HandleMark();
            }
          }}
        >
          <figure className="flex justify-center flex-col items-center">
            <Image
              onClick={() => {
                router.push(`/p/${product.id}`);
              }}
              className="cursor-pointer"
              src={product?.thumbnail ?? ""}
              width={100}
              height={100}
              alt=""
              priority
            />
          </figure>

          <div className="p-2 md:p-4 col-span-2">
            <Link href={`/p/${product.id}`} className="card-title text-base">
              {product?.name}
            </Link>
            <h1>{product.brand}</h1>
            <h1>{product.price.toString()}</h1>
          </div>

          {isMarkingForDeletion ? null : (
            <section className="flex items-center justify-center">
              <div className="flex">
                <button
                  className="btn btn-square rounded-r-none btn-xs sm:btn-sm"
                  onClick={HandleIncrementQuantity}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                  </svg>
                </button>
                <button className="btn btn-square btn-xs sm:btn-sm rounded-none">
                  {quantity}
                </button>
                <button
                  className="btn btn-square btn-xs sm:btn-sm rounded-l-none"
                  onClick={HandleDecrementQuantity}
                  disabled={quantity === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
                  </svg>
                </button>
              </div>
            </section>
          )}

          {isMarkingForDeletion ? null : (
            <section className={`flex items-center flex-col justify-center`}>
              <input
                id={cartItem.product_id.toString()}
                onChange={HandleSelect}
                type="checkbox"
                className="absolute self-end checkbox checkbox-sm "
              />
              <h1>${Number(product.price.toString()) * quantity}</h1>
            </section>
          )}
        </div>
      ) : (
        <div className="max-w-full w-full min-h-32 h-full border-t rounded-sm  border-gray-100 grid-cols-5 grid ">
          <section className="p-2">
            <div className="skeleton w-full h-full" />
          </section>

          <section className="p-2 col-span-2 flex flex-col gap-2">
            <div className="skeleton w-full h-6" />
            <div className="skeleton w-1/2 h-4" />
          </section>

          <section className="p-2 flex justify-center items-center flex-col">
            <div className="skeleton w-full h-6" />
          </section>

          <section className="p-2 flex justify-center items-center flex-col">
            <div className="skeleton w-full h-6" />
          </section>
        </div>
      )}
    </>
  );
}

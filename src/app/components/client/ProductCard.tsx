"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { getSession } from "next-auth/react";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CLIENT_PRODUCT } from "@/src/types";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export default function ProductCard({
  data: product,
}: {
  data: CLIENT_PRODUCT;
}) {
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [errorCart, setErrorCart] = useState<string | null>(null);
  const { data, error } = useSession();
  const { session, user } = { ...data };

  function HandleViewProduct() {
    router.push(`/products/${product.category}/${product.id}/`);
  }

  async function HandleAddToCart() {
    if (isAddingToCart) return;

    if (!data?.session || !user) {
      router.push("/login", { scroll: false });
      return;
    }

    setIsAddingToCart(true);
    const newCartItem = { quantity: 1, product_id: product.id };
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id, item: newCartItem }),
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

      <Card
        className="group relative w-full    max-w-sm  h-min overflow-hidden  m-0  hover:shadow-md"
        onClick={(event) => {
          // Safe target check to ensure clicking the button doesn't trigger the card navigation
          if ((event.target as HTMLElement).tagName !== "BUTTON") {
            HandleViewProduct();
          }
        }}
      >
        {/* Container for the image mimicking the overlay style */}
        <div className="relative aspect-square  w-full overflow-hidden ">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              HandleAddToCart();
            }}
            size={"icon-lg"}
            variant={"secondary"}
            className={"absolute right-2 top-2 z-10"}
          >
            {isAddingToCart ? (
              <Spinner />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  fill="#52525c"
                  d="M0 72C0 58.7 10.7 48 24 48L69.3 48C96.4 48 119.6 67.4 124.4 94L124.8 96L312 96L312 198.1L281 167.1C271.6 157.7 256.4 157.7 247.1 167.1C237.8 176.5 237.7 191.7 247.1 201L319.1 273C328.5 282.4 343.7 282.4 353 273L425 201C434.4 191.6 434.4 176.4 425 167.1C415.6 157.8 400.4 157.7 391.1 167.1L360.1 198.1L360.1 96L537.5 96C557.5 96 572.6 114.2 568.9 133.9L537.8 299.8C532.1 330.1 505.7 352 474.9 352L171.3 352L176.4 380.3C178.5 391.7 188.4 400 200 400L456 400C469.3 400 480 410.7 480 424C480 437.3 469.3 448 456 448L200.1 448C165.3 448 135.5 423.1 129.3 388.9L77.2 102.6C76.5 98.8 73.2 96 69.3 96L24 96C10.7 96 0 85.3 0 72zM160 528C160 501.5 181.5 480 208 480C234.5 480 256 501.5 256 528C256 554.5 234.5 576 208 576C181.5 576 160 554.5 160 528zM384 528C384 501.5 405.5 480 432 480C458.5 480 480 501.5 480 528C480 554.5 458.5 576 432 576C405.5 576 384 554.5 384 528z"
                />
              </svg>
            )}
          </Button>
          <Image
            src={product.thumbnail}
            width={600}
            height={600}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        <CardHeader className="pb-4 flex flex-col">
          <div className="flex w-full gap-1 flex-col lg:flex-row  ">
            <CardTitle className="line-clamp-1 flex-1  row-start-1 col-start-1  text-sm md:text-base">
              {product.name.toUpperCase()}
            </CardTitle>
            <CardAction className="">
              <Badge className="text-md">${product.price}</Badge>
            </CardAction>
          </div>
          <CardDescription className="text-xs w-full line-clamp-3  text-balance text-ellipsis    leading-4 tracking-tighter  text-zinc-500">
            {product.description}
          </CardDescription>
        </CardHeader>

        {/* <CardFooter className=" ">
          <Button
            variant={"secondary"}
            className={`w-full ${isAddingToCart ? "cursor-progress" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              HandleAddToCart();
            }}
          >
            Add to cart
          </Button>
        </CardFooter> */}
      </Card>
    </>
  );
}

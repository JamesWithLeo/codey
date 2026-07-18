"use client";

import { Button, buttonVariants } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { toast as sonnerToast } from "sonner";

type Props = {
  description?: string;
  id: string | number;

  thumbnail: string;
  link: { href: string; label: string };
  productName: string;
};
export function ProductToast(toast: Omit<Props, "id">) {
  return sonnerToast.custom((id) => (
    <AddToCartToast
      id={id}
      thumbnail={toast.thumbnail}
      productName={toast.productName}
      link={toast.link}
      description={toast.description}
    />
  ));
}

function AddToCartToast({
  description,
  productName,
  link,
  id,
  thumbnail: img,
}: Props) {
  return (
    <div className="flex rounded-lg gap-2 bg-white shadow-lg ring-1 ring-black/5 w-full md:max-w-sm items-center p-4">
      <div>
        <Image
          height={50}
          width={50}
          src={img}
          className="rounded"
          alt={productName}
        />
      </div>
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-gray-900">{`${productName} is added to cart`}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
        <Link
          href={link.href}
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          {link.label}
        </Link>
      </div>
    </div>
  );
}

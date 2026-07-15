"use client";

import { product } from "@/src/generated/prisma/client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddProduct from "../button/addProduct";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  thumbnail: string;
  stock: number;
  brand: string;
  isFeatured: boolean;
  sales: number;
};

export default function Stat({ data }: { data: Product[] }) {
  const products = data;
  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0,
  );
  const sales = products.reduce(
    (totalSales, product) => totalSales + product.sales,
    0,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
          <CardAction>
            <Button
              size="sm"
              onClick={() => {
                const modal = document.getElementById(
                  "modal",
                ) as HTMLDialogElement;
                modal?.showModal();
              }}
            >
              Add product
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">{products.length}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">{sales}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Today Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">{totalStock}</span>
        </CardContent>
      </Card>
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <AddProduct />
          <form method="dialog">
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2"
            >
              ✕
            </Button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <Button>close</Button>
        </form>
      </dialog>
    </div>
  );
}

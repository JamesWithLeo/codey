"use client";
import AddProduct from "./addProduct";

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
};

export default function Stat({ data }: { data: Product[] }) {
  const product = data;
  return (
    <>
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <AddProduct />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="stats stats-vertical shadow h-max">
        <div className="stat">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{product.length}</div>
          <div className="stat-desc"></div>
          <div className="stat-actions">
            <button
              className="btn btn-sm text-sm"
              onClick={() => {
                const modal = document.getElementById(
                  "modal",
                ) as HTMLDialogElement;
                modal.showModal();
              }}
            >
              Add product
            </button>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Sales</div>
          <div className="stat-value">{1392}</div>
          <div className="stat-desc"></div>
        </div>

        <div className="stat">
          <div className="stat-title">Today Sales</div>
          <div className="stat-value">{123}</div>
          <div className="stat-desc"></div>
        </div>
      </div>
    </>
  );
}

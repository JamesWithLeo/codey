"use client";
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

  const totalStock = products.reduce((total, product) => {
    return total + product.stock;
  }, 0);
  const sales = products.reduce(
    (totalSales, product) => totalSales + product.sales,
    0,
  );
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

      <div className="stats stats-horizontal shadow h-36">
        <div className="stat">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{products.length}</div>
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
          <div className="stat-value">{sales}</div>
          <div className="stat-desc"></div>
        </div>

        <div className="stat">
          <div className="stat-title">Today stock</div>
          <div className="stat-value">{totalStock}</div>
          <div className="stat-desc"></div>
        </div>
      </div>
    </>
  );
}

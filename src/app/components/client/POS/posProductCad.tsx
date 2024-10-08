"use client";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
type productType = {
  id: number;
  name: string;
  price: number;
  brand: string;

  total_price: number;
  quantity: number;
};
export default function PosProductCard({
  product,
  onAdd,
}: {
  product: productType;
  onAdd: (product: productType) => void;
}) {
  const router = useRouter();
  function HandleAddToTerminal() {
    onAdd(product);
  }
  function HandleOpen(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    (
      document.getElementById(product.id.toString()) as HTMLDialogElement
    ).showModal();
  }
  return (
    <>
      <main
        className="w-full h-20 md:p-4 p-2 justify-between hover:bg-gray-100 flex gap-2 text-xs md:text-sm"
        id="main_card"
        onDoubleClick={HandleOpen}
      >
        <div className="text-sm overflow-x-hidden">
          <h1 className="truncate">{product.name}</h1>
          <h1 className="truncate">{product.brand}</h1>
        </div>
        <div>
          <button
            className="rounded-full active:bg-gray-200 before:bg-gray-100 p-1 duration-400"
            onClick={HandleAddToTerminal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#B43F3F"
              viewBox="0 0 256 256"
            >
              <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
            </svg>
          </button>
        </div>
      </main>

      <dialog
        id={product.id.toString()}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg select-none">{product.name}</h3>
          <p className="py-4">{product.price}</p>
          <div className="modal-action">
            <button className="btn bg-primary" onClick={HandleAddToTerminal}>
              Add
            </button>
            <button
              onClick={() => {
                router.replace(`/p/${product.id}`);
                document.body.style.overflowY = "scroll";
              }}
              className="btn"
            >
              view in home page
            </button>
            <form method="dialog">
              <button className="btn btn-ghost">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

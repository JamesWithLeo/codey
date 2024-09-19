import { Category } from "@prisma/client";
type productType = {
  id: number;
  name: string;
  category: Category;
  price: number;
  brand: string;
  thumbnail: string;

  total_price: number;
  quantity: number;
};
export default function PosSelectedProduct({
  product,
  onIncrement,
  onDecrement,
}: {
  product: productType;
  onIncrement: (toAddProduct: productType) => void;
  onDecrement: (toRemoveProduct: productType) => void;
}) {
  return (
    <>
      <div
        key={product.id}
        className="grid grid-cols-6 w-full px-2 py-1 text-sm border-b"
      >
        <h1 className="col-span-3 truncate overflow-y-hidden ">
          {product.name}
        </h1>
        <h1>{product.quantity}</h1>
        <h1 className="">{product.total_price.toFixed(2)}</h1>
        <div className="col-start-6 flex items-center justify-end">
          <button
            className="text-contrast"
            onClick={() => {
              onIncrement(product);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,176H52V52H204ZM76,128a12,12,0,0,1,12-12h28V88a12,12,0,0,1,24,0v28h28a12,12,0,0,1,0,24H140v28a12,12,0,0,1-24,0V140H88A12,12,0,0,1,76,128Z"></path>
            </svg>
          </button>

          <button
            className="text-contrast"
            onClick={() => {
              onDecrement(product);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

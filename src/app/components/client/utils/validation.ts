export interface IOrder {
  product_id: number;
  quantity: number;
  total_price: number;
  product_name: string;
}

export interface productType {
  id: number;
  name: string;
  price: number;
  brand: string;
  total_price: number;
  quantity: number;
}
export function isOrderValidForPOS(order: any): order is IOrder {
  return (
    typeof order === "object" &&
    order !== null &&
    !Number.isNaN(order.product_id) &&
    typeof order.product_id === "number" &&
    !Number.isNaN(order.quantity) &&
    typeof order.quantity === "number" &&
    !Number.isNaN(order.total_price) &&
    typeof order.total_price === "number" &&
    typeof order.product_name === "string"
  );
}

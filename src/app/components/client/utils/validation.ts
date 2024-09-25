export interface IOrder {
  id: number;
  quantity: number;
  total_price: number;
  name: string;
}
export function isOrderValidForPOS(order: any): order is IOrder {
  return (
    typeof order === "object" &&
    order !== null &&
    typeof order.id === "number" &&
    !Number.isNaN(order.id) &&
    typeof order.quantity === "number" &&
    !Number.isNaN(order.quantity) &&
    !Number.isNaN(order.total_price) &&
    typeof order.total_price === "number" &&
    typeof order.name === "string"
  );
}

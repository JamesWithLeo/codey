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
export interface ICart {
  quantity: number;
  product_id: number;
}

export function isValidCartItem(item: any): item is ICart {
  return (
    typeof item.quantity === "number" &&
    !Number.isNaN(item.quantity) &&
    typeof item.product_id === "number" &&
    !Number.isNaN(item.product_id)
  );
}

type IUpdateProduct = {
  id: number;
  quantity: number;
};

export function isValidToUpdate(product: any): product is IUpdateProduct {
  return (
    typeof product.id === "number" &&
    !Number.isNaN(product.id) &&
    typeof product.quantity === "number" &&
    !Number.isNaN(product.quantity)
  );
}

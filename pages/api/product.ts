import { NextApiRequest, NextApiResponse } from "next";
import { Category, Prisma, product } from "@prisma/client";
import { prisma } from "@/prisma";

interface IProduct {
  name: string;
  brand: string;
  description: string;
  stock: number;
  thumbnail: string;
  isAvailable: boolean;
  isFeatured: boolean;
  otherUrl: string[];
  price: Prisma.Decimal;
  category: Category;
}
function isValidProduct(product: any): product is IProduct {
  return (
    typeof product.name === "string" &&
    typeof product.brand === "string" &&
    typeof product.description === "string" &&
    typeof product.thumbnail === "string" &&
    typeof product.stock === "number" &&
    !Number.isNaN(product.stock) &&
    typeof product.isAvailable === "boolean" &&
    typeof product.isFeatured === "boolean" &&
    Array.isArray(product.otherUrl) &&
    product.otherUrl.every((url: any) => typeof url === "string") &&
    typeof product.price === "number" &&
    Object.values(Category).includes(product.category)
  );
}
type IUpdateProduct = {
  id: number;
  quantity: number;
};
function isValidToUpdate(product: any): product is IUpdateProduct {
  return (
    typeof product.id === "number" &&
    !Number.isNaN(product.id) &&
    typeof product.quantity === "number" &&
    !Number.isNaN(product.quantity)
  );
}
async function updateStockAndSales({
  id,
  newStock,
  newSales,
}: {
  id: number;
  newStock: number;
  newSales: number;
}) {
  const updatedProduct = await prisma.product.update({
    where: { id: id },
    data: { sales: newSales, stock: newStock },
  });
  return updatedProduct;
}
async function findProduct(id: number) {
  const product = await prisma.product.findFirst({ where: { id: id } });
  return product;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const products = await prisma.product.findMany();
      res.status(200).json({ ok: 1, products });
      return;

    case "POST":
      const product = req.body as IProduct;
      console.log(product);
      if (!isValidProduct(product))
        return res
          .status(400)
          .json({ ok: 0, error: "invalid product", product });

      const price = new Prisma.Decimal(req.body.price);
      const otherProductField = req.body;
      const validProduct = { price, ...otherProductField };

      const insertedProduct = await prisma.product.create({
        data: validProduct,
      });
      return res.status(200).json({ ok: 1, product: insertedProduct });

    case "PUT":
      const toUpdateProducts = JSON.parse(req.body) as any[];
      const isValidProducts = toUpdateProducts.map((product) => {
        return isValidToUpdate(product);
      });
      const isValidAll = isValidProducts.every((product) => product === true);
      if (!isValidAll)
        return res
          .status(400)
          .json({ ok: 0, error: "Update fields contains invalid values" });

      const logs = await Promise.all(
        toUpdateProducts.map(
          async (productToModify: { id: number; quantity: number }) => {
            const { id, quantity } = productToModify;

            const originalProduct = await findProduct(id);
            if (!originalProduct) return res.status(400).json({ ok: 0 });
            const newSales = originalProduct.sales + quantity;
            const newStock = originalProduct.stock - quantity;

            const updatedProduct = await updateStockAndSales({
              id,
              newStock,
              newSales,
            });
            return { productToModify, originalProduct, updatedProduct };
          },
        ),
      );

      console.log(logs);
      return res.status(200).json({ ok: 1, logs });

    case "DELETE":
      return res.status(200).json({ ok: 1 });
  }
}

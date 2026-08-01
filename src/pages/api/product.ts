import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@/src/generated/prisma/client";
import { Category } from "@/src/generated/prisma/enums";

import { prisma } from "@/src/prisma";
import { isValidCartToUpdate } from "@/lib/utils";

interface IProduct {
  name: string;
  brand: string;
  description: string;
  stock: number;
  thumbnail: string;
  isAvailable: boolean;
  isFeatured: boolean;
  otherUrl: string[];
  price: number;
  category: Category;
}

function parseBody(body: unknown) {
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body ?? {};
}

function isValidProduct(product: any): product is IProduct {
  return (
    typeof product?.name === "string" &&
    typeof product?.brand === "string" &&
    typeof product?.description === "string" &&
    typeof product?.thumbnail === "string" &&
    typeof product?.stock === "number" &&
    !Number.isNaN(product.stock) &&
    typeof product?.isAvailable === "boolean" &&
    typeof product?.isFeatured === "boolean" &&
    Array.isArray(product?.otherUrl) &&
    product.otherUrl.every((url: any) => typeof url === "string") &&
    typeof product?.price === "number" &&
    !Number.isNaN(product.price) &&
    Object.values(Category).includes(product.category)
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

function serializeProduct(product: any) {
  return {
    ...product,
    price: product.price?.toString ? product.price.toString() : product.price,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET": {
      const id = Number(req.query.id);
      if (Number.isInteger(id)) {
        const selectedProduct = await prisma.product.findFirst({
          where: { id: id },
        });
        if (!selectedProduct) return res.status(400).json({ ok: 0 });

        return res
          .status(200)
          .json({ ok: 1, product: serializeProduct(selectedProduct) });
      }

      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res
        .status(200)
        .json({ ok: 1, products: products.map(serializeProduct) });
    }

    case "POST": {
      const product = parseBody(req.body) as IProduct;
      if (!isValidProduct(product)) {
        return res
          .status(400)
          .json({ ok: 0, error: "invalid product", product });
      }

      const price = new Prisma.Decimal(product.price);
      const insertedProduct = await prisma.product.create({
        data: { ...product, price },
      });
      return res
        .status(200)
        .json({ ok: 1, product: serializeProduct(insertedProduct) });
    }

    case "PUT": {
      const body = parseBody(req.body) as any;
      if (Array.isArray(body)) {
        const isValidProducts = body.map((product) =>
          isValidCartToUpdate(product),
        );
        const isValidAll = isValidProducts.every((product) => product === true);
        if (!isValidAll) {
          return res
            .status(400)
            .json({ ok: 0, error: "Update fields contains invalid values" });
        }

        const logs = await Promise.all(
          body.map(
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

        return res.status(200).json({ ok: 1, logs });
      }

      const id = Number(body.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ ok: 0, error: "missing product id" });
      }

      const updateData: Record<string, unknown> = {};
      if (typeof body.name === "string") updateData.name = body.name;
      if (typeof body.brand === "string") updateData.brand = body.brand;
      if (typeof body.description === "string")
        updateData.description = body.description;
      if (typeof body.thumbnail === "string")
        updateData.thumbnail = body.thumbnail;
      if (typeof body.stock === "number") updateData.stock = body.stock;
      if (typeof body.isAvailable === "boolean")
        updateData.isAvailable = body.isAvailable;
      if (typeof body.isFeatured === "boolean")
        updateData.isFeatured = body.isFeatured;
      if (Array.isArray(body.otherUrl)) updateData.otherUrl = body.otherUrl;
      if (typeof body.category === "string")
        updateData.category = body.category;
      if (typeof body.price === "number")
        updateData.price = new Prisma.Decimal(body.price);

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: updateData,
      });

      return res
        .status(200)
        .json({ ok: 1, product: serializeProduct(updatedProduct) });
    }

    case "DELETE": {
      const id = Number(req.query.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ ok: 0, error: "missing product id" });
      }
      await prisma.product.delete({ where: { id } });
      return res.status(200).json({ ok: 1 });
    }

    default:
      return res.status(405).json({ ok: 0, error: "method not allowed" });
  }
}

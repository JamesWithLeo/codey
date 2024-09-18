import { NextApiRequest, NextApiResponse } from "next";
import { Category, Prisma } from "@prisma/client";
import { prisma } from "@/prisma";
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
      const name = req.body.name as string;
      const price = new Prisma.Decimal(req.body.price);
      const stock = parseInt(req.body.stock);
      const brand = req.body.brand as string;
      const thumbnail = req.body.thumbnail as string;
      const category = req.body.category as Category;
      const description = req.body.description as string;
      const isAvailable = req.body.isAvailable === true;
      const isFeatured = req.body.isFeatured === true;
      const otherUrl = req.body.otherUrl as string[];
      const newProduct = {
        name: name,
        price: price,
        stock: stock,
        brand: brand,
        thumbnail: thumbnail,
        category: category,
        description: description,
        isFeatured: isFeatured,
        isAvailable: isAvailable,
        otherUrl: otherUrl,
      };
      const product = await prisma.product.create({ data: newProduct });
      res.status(200).json({ ok: 1, product });
      return;

    case "PUT":
      res.status(200).json({ message: "GET" });
      return;

    case "DELETE":
      res.status(200).json({ message: "GET" });
      return;
  }
}

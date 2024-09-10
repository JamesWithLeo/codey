import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ message: "GET" });
      return;

    case "POST":
      const name = req.body.name as string;
      const price = parseInt(req.body.price);
      const stock = parseInt(req.body.stock);
      const brand = req.body.brand as string;
      const imageUrl = req.body.imageUrl as string;
      const category = req.body.category as string;
      const description = req.body.description as string;
      const isFeatured = req.body.isFeatured === "true";
      const newProduct = {
        name: name,
        price: price,
        stock: stock,
        brand: brand,
        imageUrl: imageUrl,
        category: category,
        description: description,
        isFeatured: isFeatured,
      };
      console.log(newProduct);
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

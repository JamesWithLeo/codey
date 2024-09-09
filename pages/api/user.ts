import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type user = {
  id: number;
  firstname: string;
  lastname: string;
  createdAt: Date;
};

type ResponseData = {
  errorMessage?: string;
  message?: string;
  user?: user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  switch (req.method) {
    case "GET":
      console.log("get");
      res.status(200).json({ message: "GET" });
      return;

    case "POST":
      const firstName = req.body.firstname as string;
      const lastName = req.body.lastname as string;
      if (!firstName || !lastName) {
        res.status(400).json({ errorMessage: "missing parameters" });
        return;
      }
      console.log(firstName, lastName);
      const user = await prisma.users.create({
        data: {
          firstname: firstName,
          lastname: lastName,
        },
      });
      res.status(200).json({ message: "document inserted", user });
      return;
    case "PUT":
      break;

    case "DELETE":
      break;
  }
}

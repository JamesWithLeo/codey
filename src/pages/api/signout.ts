import { prisma } from "@/src/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.body.id;
  if (!id || typeof id !== "string")
    return res.status(400).json({ ok: 1, error: "Invalid id" });

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return res.status(404).json({ ok: 0, error: "User not found" });
  }

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      isOnline: false,
    },
  });

  return res.status(200).json({ ok: 1, isOnline: updatedUser.isOnline });
}

import { prisma } from "@/prisma";
import React from "react";
import Stat from "../client/stat/userStat";

export default function UserStat() {
  const user = prisma.users.findMany();
  return (
    <>
      <Stat data={user} />
    </>
  );
}

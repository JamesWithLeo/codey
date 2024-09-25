"use client";

import { users } from "@prisma/client";
import { use } from "react";

export default function Stat({ data }: { data: Promise<users[]> }) {
  const users = use(data);
  const active = users.filter((user) => user.isOnline);
  return (
    <div className="stats stats-horizontal shadow h-36">
      <div className="stat p-2 md:p-4">
        <div className="stat-title">Total user</div>
        <div className="stat-value">{users.length}</div>
        <div className="stat-desc"></div>
      </div>
      <div className="stat p-2 md:p-4">
        <div className="stat-title">Online user</div>
        <div className="stat-value">{active.length}</div>
        <div className="stat-desc"></div>
      </div>
    </div>
  );
}

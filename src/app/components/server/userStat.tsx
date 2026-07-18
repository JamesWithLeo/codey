import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/src/generated/prisma/client";
import { use } from "react";

export default function Stat({ data }: { data: Promise<User[]> }) {
  const users = use(data);
  const active = users.filter((user) => user.isOnline);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">{users.length}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Online Users</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">{active.length}</span>
          <Badge variant="secondary" className="ml-2">
            Live
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}

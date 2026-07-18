import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileDashboard from "@/src/app/components/client/profile-dashboard";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!session || !user) redirect("/login");

  return <ProfileDashboard user={user} />;
}

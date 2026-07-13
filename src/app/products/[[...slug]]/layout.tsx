import { auth } from "@/src/authOptions";
import Header from "../../components/server/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <div className="">
        <Header session={session} />
        {children}
      </div>
    </>
  );
}

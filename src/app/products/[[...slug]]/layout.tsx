// import { auth } from "@/src/authOptions";
import { authClient } from "@/lib/auth-client";
import Header from "../../components/Headers/ProductHeader";
import Footer from "../../components/client/footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  const { data: session, error } = await authClient.getSession();
  return (
    <>
      <div className="">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

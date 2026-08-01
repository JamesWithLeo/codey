import Header from "../../components/Headers/ProductHeader";
import Footer from "../../components/client/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
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

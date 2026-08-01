import GlobalHeader from "../components/Headers/GlobalHeader";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalHeader />
      <div className="overflow-y-hidden h-[calc(100dvh-4rem)] px-4 md:px-8  w-full border-t py-4    ">
        {children}
      </div>
    </>
  );
}

import GlobalHeader from "../components/Headers/GlobalHeader";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalHeader />
      <div className="overflow-y-auto h-[calc(100dvh-6rem)] px-4 md:px-8  w-full py-4    ">
        {children}
      </div>
    </>
  );
}

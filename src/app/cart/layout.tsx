export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-hidden h-[calc(100dvh-4rem)] px-4 md:px-8">
      {children}
    </div>
  );
}

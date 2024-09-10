import Image from "next/image";
import Link from "next/link";
import Card from "./components/client/card";
export default async function Home() {
  return (
    <main className="w-full my-2 h-dvh flex px-8 flex-col items-center justify-center">
      <div className="h-full grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}

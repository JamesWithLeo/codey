import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center">
      <h1>Codey</h1>
      <h1>Knowledge Bank</h1>
      <Link href={"login"}>Login</Link>
      <Link href={"signup"}>sign up</Link>
    </main>
  );
}

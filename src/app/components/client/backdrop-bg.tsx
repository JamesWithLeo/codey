"use client";

import { useRouter } from "next/navigation";

export default function BackdropBg() {
  const router = useRouter();
  return (
    <div
      className="w-full min-h-screen bg-zinc-600 z-40 fixed top-0 left-0 opacity-90 backdrop-blur-3xl cursor-pointer overflow-y-hidden backdrop-opacity-50 "
      onClick={() => {
        router.back();
      }}
    ></div>
  );
}

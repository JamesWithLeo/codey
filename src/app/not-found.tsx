"use client";

import { useRouter } from "next/navigation";
import { DM_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

const sans = DM_Sans({ style: "normal", subsets: ["latin"] });

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className={`min-h-[80vh] w-full flex items-center justify-center px-6 ${sans.className}`}
    >
      <div className="max-w-md w-full text-center flex flex-col items-center">
        {/* Construction Themed Warning Icon */}
        <div className="bg-amber-100 p-4 rounded-full text-amber-600 mb-6 border border-amber-200 shadow-sm animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.35-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,96a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Zm8,92a12,12,0,1,1,12-12A12,12,0,0,1,128,188Z" />
          </svg>
        </div>

        {/* Error Status codes */}
        <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
          Error 404
        </span>

        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-500 max-w-sm">
          We couldn&apos;t find the page or hardware category you were looking
          for. It might have been moved or removed from our store directory.
        </p>

        {/* Dynamic Navigation Actions */}
        <div className="mt-8 max-w-sm grid grid-cols-1 grid-rows-1  w-full flex-col sm:grid-cols-2 sm:grid-rows-1 gap-3  justify-center">
          <Button
            size={"lg"}
            variant="outline"
            className="w-full gap-2 "
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>

          {/* Added asChild here to cleanly morph the Button into the Next.js Link */}
          <Button
            className="w-full gap-2"
            size={"lg"}
            onClick={() => router.replace("/")}
          >
            <Home className="h-4 w-4" />
            Go to Home page
          </Button>
        </div>

        {/* Context Help Note */}
        <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
          <p className="text-xs text-gray-400">
            Persistent page errors? contact the systems administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

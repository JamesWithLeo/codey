"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DM_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";

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
          Asset Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-500 max-w-sm">
          The tool, material category, or inventory manifest you are looking for
          might have been relocated, deleted, or hasn't been provisioned yet.
        </p>

        {/* Dynamic Navigation Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button size={"lg"} onClick={() => router.back()} variant={"outline"}>
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Worksite
          </Button>

          <Button
            size={"lg"}
            // className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <Link href="/inventory">Go to Inventory Dashboard</Link>
          </Button>
        </div>

        {/* Context Help Note */}
        <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
          <p className="text-xs text-gray-400">
            Persistent inventory sync errors? contact the systems administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

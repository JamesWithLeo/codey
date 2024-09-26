"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = [
  "handtools",
  "powertools",
  "materials",
  "electrical",
  "plumbing",
  "fasteners",
  "safetygears",
  "machineries",
];
export default function Pagination({
  isEnd,
  nextCursor,
  limit,
}: {
  isEnd: boolean;
  nextCursor: number;
  limit: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(() => {
    const currentPage = searchParams?.get("page");
    if (currentPage && !Number.isNaN(parseInt(currentPage)))
      return parseInt(currentPage);
    else {
      return 1;
    }
  });

  const HandleNext = () => {
    const category = pathname?.split("/")[1];
    if (category && categories.includes(category)) {
      router.replace(`/${category}/?cursor=${nextCursor}&page=${page + 1}`);
      setPage((current) => current + 1);
    } else {
      router.replace(`/?cursor=${nextCursor}&page=${page + 1}`);
      setPage((current) => current + 1);
    }
  };

  const HandleBack = () => {
    if (page !== 1) setPage((current) => current - 1);
    const category = pathname?.split("/")[1];

    const prevCursor = searchParams?.get("cursor");
    const cursor = prevCursor ? parseInt(prevCursor) - limit : 1;

    if (category && categories.includes(category)) {
      if (cursor > 1)
        router.replace(`${category}/?cursor=${cursor}&page=${page}`);
      else router.replace(`${category}/?cursor=1&page=${1}`);
    } else {
      if (cursor > 1) router.replace(`/?cursor=${cursor}&page=${page}`);
      else router.replace(`/?cursor=1&page=${1}`);
    }
  };

  return (
    <>
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={HandleBack}
          disabled={page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
          </svg>
        </button>
        <button className="join-item btn btn-sm ">
          <>Page {page}</>
        </button>
        <button
          className="join-item btn btn-sm"
          onClick={HandleNext}
          disabled={isEnd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}

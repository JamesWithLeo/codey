"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Pagination({
  isEnd,
  nextCursor,
}: {
  isEnd: boolean;
  nextCursor: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const HandleNext = () => {
    router.replace(`/?cursor=${nextCursor}`);
    setPage(page + 1);
  };

  const HandleBack = () => {
    const productLimit = 10;
    const prevCursor = searchParams?.get("cursor");
    let cursor = 1;
    if (prevCursor) cursor = parseInt(prevCursor, 10) - productLimit;
    console.log(cursor);
    router.replace(`/?cursor=${cursor}`);
    setPage(page - 1);
  };

  return (
    <>
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={HandleBack}
          disabled={page === 1}
        >
          «
        </button>
        <button className="join-item btn btn-sm ">
          <>Page {page}</>
        </button>
        <button
          className="join-item btn btn-sm"
          onClick={HandleNext}
          disabled={isEnd}
        >
          »
        </button>
      </div>
    </>
  );
}

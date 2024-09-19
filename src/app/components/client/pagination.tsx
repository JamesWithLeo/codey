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
  const [page, setPage] = useState<number>(() => {
    const currentPage = searchParams?.get("page");
    if (currentPage && !isNaN(parseInt(currentPage)))
      return parseInt(currentPage);
    else {
      return 1;
    }
  });
  const HandleNext = () => {
    router.replace(`/?cursor=${nextCursor}&page=${page + 1}`);
    setPage((current) => current + 1);
  };

  const HandleBack = () => {
    const productLimit = 10;
    const prevCursor = searchParams?.get("cursor");
    let cursor = 1;
    if (prevCursor) cursor = parseInt(prevCursor, 10) - productLimit;
    if (page !== 1) setPage((current) => current - 1);
    if (cursor > 1) router.replace(`/?cursor=${cursor}&page=${page}`);
    else router.replace(`/?cursor=1&page=${1}`);
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

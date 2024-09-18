"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Pagination({
  isEnd,
  nextCursor,
}: {
  isEnd: boolean;
  nextCursor: number;
}) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const HandleNext = () => {
    router.replace(`/?cursor=${nextCursor}`);
    setPage(page + 1);
  };

  const HandleBack = () => {
    const prevCursor = nextCursor - 10;
    console.log(nextCursor);
    router.replace(`/?cursor=${prevCursor}`);
    setPage(page - 1);
  };

  return (
    <>
      <div className="join">
        <button className="join-item btn btn-sm" onClick={HandleBack}>
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

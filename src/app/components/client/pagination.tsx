"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pagination({ isEnd }: { isEnd: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [page, setPage] = useState<number>(() => {
    const currentPage = searchParams?.get("page");
    if (!currentPage) return 0;
    if (isNaN(parseInt(currentPage))) return 0;
    return parseInt(currentPage, 10);
  });
  function movePage() {
    router.replace(`/?page=${page}`);
  }
  const HandleNext = () => {
    setPage(page + 1);
  };

  const HandleBack = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    movePage();
  }, [page]);
  return (
    <>
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={HandleBack}
          disabled={page === 0}
        >
          «
        </button>
        <button className="join-item btn btn-sm ">
          <>Page {page + 1}</>
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

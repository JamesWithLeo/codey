"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
export default function ProductPagination({
  isEnd,
  nextCursor,
  limit,
}: {
  isEnd: boolean;
  nextCursor: number;
  limit: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawPage = searchParams?.get("page");
  const page = rawPage && !Number.isNaN(rawPage) ? parseInt(rawPage) : 1;

  const HandleNext = () => {
    const category = pathname?.split("/")[1];
    if (category && categories.includes(category)) {
      return `/${category}/?cursor=${nextCursor}&page=${page + 1}`;
    } else {
      return `/?cursor=${nextCursor}&page=${page + 1}`;
    }
  };

  const HandleBack = (firstProductIdOnCurrentPage: number) => {
    const category = pathname?.split("/")[1];
    const baseUrl =
      category && categories.includes(category) ? `/${category}` : "";

    const prevPage = Math.max(1, page - 1);

    // Send the first visible ID as the anchor, and add a direction flag
    return `${baseUrl}/?cursor=${firstProductIdOnCurrentPage}&page=${prevPage}`;
  };

  return (
    <>
      <Pagination className="">
        <PaginationContent>
          {page !== 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious href={HandleBack(1)} />
              </PaginationItem>
              {isEnd && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          {!isEnd && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href={HandleNext()} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

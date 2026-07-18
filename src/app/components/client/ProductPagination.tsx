"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductPagination({
  isEnd,
  firstCursor,
  nextCursor,
  defaultLimit = 15,
}: {
  isEnd: boolean;
  firstCursor?: number | string;
  nextCursor?: number | string;
  defaultLimit?: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawPage = searchParams?.get("page");
  const page =
    rawPage && !Number.isNaN(parseInt(rawPage)) ? parseInt(rawPage) : 1;
  const itemsPerPage = searchParams?.get("limit") || defaultLimit.toString();

  // Helper function to build and execute the navigation cleanly
  const navigateWithParams = (
    updateParams: (params: URLSearchParams) => void,
  ) => {
    const params = new URLSearchParams(searchParams?.toString());
    updateParams(params);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLimitChange = (newLimit: string) => {
    navigateWithParams((params) => {
      params.set("limit", newLimit);
      params.delete("page");
      params.delete("cursor"); // Reset back to page 1 on limit modification
    });
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nextCursor || isEnd) return;

    navigateWithParams((params) => {
      params.set("cursor", nextCursor.toString());
      params.set("page", (page + 1).toString());
      params.set("limit", itemsPerPage);
    });
  };

  const handleBackPage = (e: React.MouseEvent) => {
    e.preventDefault();
    const prevPage = Math.max(1, page - 1);

    navigateWithParams((params) => {
      if (prevPage === 1) {
        // Wipe cursor state cleanly out to pull from the top of the search result stack
        params.delete("cursor");
        params.delete("page");
      } else if (firstCursor) {
        // Approach A: Send back the first item's ID as the marker for the prior data window
        params.set("cursor", firstCursor.toString());
        params.set("page", prevPage.toString());
      }
    });
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 w-full max-w-7xl pb-4 gap-8 md:gap-6">
      <div aria-hidden="true" className="hidden md:block" />

      <Pagination className="flex-1 justify-center">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handleBackPage} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          {!isEnd && nextCursor && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={handleNextPage} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>

      <Field orientation="horizontal" className="w-max place-self-end">
        <FieldLabel htmlFor="select-items-per-page" className="text-nowrap">
          Items per page
        </FieldLabel>
        <Select
          value={itemsPerPage}
          onValueChange={(value) => value && handleLimitChange(value)}
          id="select-items-per-page"
        >
          <SelectTrigger className="w-20" id="select-items-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}

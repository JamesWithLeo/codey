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
  defaultLimit = 15,
}: {
  isEnd: boolean;
  nextCursor: number;
  limit: number;
  defaultLimit?: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawPage = searchParams?.get("page");
  const page = rawPage && !Number.isNaN(rawPage) ? parseInt(rawPage) : 1;
  const itemsPerPage = searchParams?.get("limit") || defaultLimit.toString();

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("limit", newLimit);
    params.delete("page");
    params.delete("cursor");

    router.push(`${pathname}?${params.toString()}`);
  };

  const HandleNext = () => {
    // 1. Create a copy of all current URL params (keeps your current category and search name!)
    const params = new URLSearchParams();

    // 2. Set the moving parts for the next page
    params.set("cursor", nextCursor.toString());
    params.set("page", (page + 1).toString());
    params.set("limit", itemsPerPage);

    // 3. Keep the current plain pathname (e.g., "/") and attach the safe query string
    return `${pathname}?${params.toString()}`;
  };

  const HandleBack = (firstProductIdOnCurrentPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    const prevPage = Math.max(1, page - 1);

    params.set("cursor", firstProductIdOnCurrentPage.toString());
    params.set("page", prevPage.toString());
    params.set("limit", itemsPerPage);

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 w-full max-w-7xl   gap-8 md:gap-6  ">
      <div aria-hidden="true" className="hidden md:block" />
      <Pagination className="flex-1 justify-center ">
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
      <Field orientation="horizontal" className="w-max  place-self-end">
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
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}

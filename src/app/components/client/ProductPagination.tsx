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
  firstCursor?: number;
  nextCursor?: number;
  defaultLimit?: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawPage = searchParams?.get("page");
  const page =
    rawPage && !Number.isNaN(parseInt(rawPage)) ? parseInt(rawPage) : 1;
  const itemsPerPage = searchParams?.get("limit") || defaultLimit.toString();

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("limit", newLimit);
    params.delete("page");
    params.delete("cursor"); // Reset back to page 1 on limit modification

    router.push(`${pathname}?${params.toString()}`);
  };

  const HandleNext = () => {
    if (!nextCursor || isEnd) return "#";

    // Clone existing params so search strings / category slugs are preserved!
    const params = new URLSearchParams(searchParams?.toString());

    params.set("cursor", nextCursor.toString());
    params.set("page", (page + 1).toString());
    params.set("limit", itemsPerPage);

    return `${pathname}?${params.toString()}`;
  };

  const HandleBack = () => {
    const params = new URLSearchParams(searchParams?.toString());
    const prevPage = Math.max(1, page - 1);

    if (prevPage === 1) {
      // Cleanest practice: If moving back to page 1, wipe the cursor state out.
      // This forces Prisma to pull cleanly from the top of your search results stack.
      params.delete("cursor");
      params.delete("page");
    } else if (firstCursor) {
      params.set("cursor", firstCursor.toString());
      params.set("page", prevPage.toString());
    }

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 w-full max-w-7xl pb-4 gap-8 md:gap-6">
      <div aria-hidden="true" className="hidden md:block" />

      <Pagination className="flex-1 justify-center">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={HandleBack()} />
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
                <PaginationNext href={HandleNext()} />
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
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}

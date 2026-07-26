"use client";

import { Input } from "@/components/ui/input";
import { Category } from "../../../generated/prisma/enums";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state directly from the URL so it stays perfectly synced
  const [value, setValue] = useState(searchParams?.get("query") || "");

  // Update input if URL changes externally (e.g., clearing search)
  useEffect(() => {
    setValue(searchParams?.get("query") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    const splittedPath = pathname?.split("/") || [];
    const category = splittedPath[2];

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Always reset pagination when search criteria changes!
    params.delete("cursor");
    params.delete("page");

    // Determine target path based on valid Prisma category enum
    const isValidCategory =
      splittedPath.length >= 2 &&
      Object.values(Category).includes(category as Category);
    const targetPath = isValidCategory ? `/products/${category}` : "/products";

    router.replace(`${targetPath}?${params.toString()}`, { scroll: true });
  }, 500); // 500ms is standard and feels snappier than 1000ms

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    handleSearch(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch.flush(); // Instantly execute search without waiting for debounce
    }
  };

  return (
    <ButtonGroup className="hidden sm:flex rounded-full h-8 input input-bordered items-center px-0">
      <Input
        className="h-full px-2"
        placeholder="Search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="outline"
        size="lg"
        className="p-2 flex items-center justify-center"
        onClick={() => handleSearch.flush()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#9ca3af"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </Button>
    </ButtonGroup>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <ButtonGroup className="hidden sm:flex rounded-full h-8 input input-bordered items-center px-0">
          <Input className="h-full px-2" placeholder="Search" disabled />
          <Button
            variant="outline"
            size="lg"
            className="p-2 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#9ca3af"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </Button>
        </ButtonGroup>
      }
    >
      <SearchInput />
    </Suspense>
  );
}

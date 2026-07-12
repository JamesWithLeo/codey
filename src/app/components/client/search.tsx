"use client";

import { Input } from "@/components/ui/input";
import { Category } from "../../../generated/prisma/enums";
import { useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export default function Search() {
  const router = useRouter();
  const path = usePathname();

  function HandleEnter() {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        HandleSearch();
      }
    });
  }
  const HandleSearch = useDebouncedCallback(() => {
    const searchInput = document.getElementById(
      "searchInput",
    ) as HTMLInputElement;

    const search = searchInput.value;
    const splittedPath = path?.split("/") || []; // [ "", "products", "category", "productId"]

    // Handle if the search input is cleared
    const category = splittedPath[2];
    if (!search) {
      if (
        splittedPath &&
        Object.values(Category).includes(category as Category)
      ) {
        router.replace(`/products/${category}`);
      } else {
        router.replace("/products");
      }
      HandleSearch.flush();
      return;
    }

    // check whether category is valid. if not, search to all categories
    if (
      splittedPath.length >= 2 &&
      Object.values(Category).includes(category as Category)
    ) {
      router.replace(`/products/${category}?query=${search}`, {
        scroll: true,
      });
    } else {
      router.replace(`/products/?query=${search}`, {
        scroll: true,
      });
    }
  }, 1000);

  return (
    <ButtonGroup className=" hidden sm:flex rounded-full h-8 input input-bordered after: items-center px-0">
      <Input
        onFocus={HandleEnter}
        className=" h-full px-2"
        placeholder="Search"
        id="searchInput"
        onChange={HandleSearch}
      />
      <Button
        variant={"outline"}
        size={"lg"}
        className="p-2 flex items-center justify-center"
        onClick={HandleSearch}
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

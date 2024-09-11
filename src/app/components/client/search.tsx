"use client";

import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  function HandleEnter() {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        HandleSearch();
      }
    });
  }
  function HandleSearch() {
    const searchInput = document.getElementById(
      "searchInput",
    ) as HTMLInputElement;
    const search = searchInput.value;
    if (!search) return;
    searchInput.value = "";

    router.push(`/search?query=${search}`, {
      scroll: true,
    });
  }

  return (
    <label className="input-sm flex rounded-full input input-bordered items-center px-1">
      <input
        onFocus={HandleEnter}
        className="input-sm input-bordered"
        placeholder="Search"
        id="searchInput"
      />
      <button
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
      </button>
    </label>
  );
}

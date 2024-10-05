"use client";
import { DM_Sans } from "next/font/google";
const sans = DM_Sans({ style: "normal", subsets: [] });
import { usePathname, useRouter } from "next/navigation";
export default function CategoryNav() {
  const router = useRouter();
  const path = usePathname();
  if (
    path === "/login" ||
    path === "/signup" ||
    path?.startsWith("/p/") ||
    path?.startsWith("/admin") ||
    path?.startsWith("/cart")
  )
    return null;

  function HandleNext() {
    const categoriesContainer = document.getElementById(
      "categoriesContainer",
    ) as HTMLDivElement;

    categoriesContainer.scrollBy({ behavior: "smooth", left: 150 });
  }

  function HandlePrev() {
    const categoriesContainer = document.getElementById(
      "categoriesContainer",
    ) as HTMLDivElement;

    categoriesContainer.scrollBy({ behavior: "smooth", left: -150 });
  }
  return (
    <section
      className={`flex gap-2 ${sans.className} md:flex-col  border-t pt-2 flex justify-between  px-4 md:px-8 text-xs items-center font-light `}
    >
      <button
        className="btn btn-circle md:hidden left-0 btn-xs "
        onClick={HandlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#0f0f0f"
          viewBox="0 0 256 256"
        >
          <path d="M168,48V208a8,8,0,0,1-13.66,5.66l-80-80a8,8,0,0,1,0-11.32l80-80A8,8,0,0,1,168,48Z"></path>
        </svg>
      </button>

      <div
        className="md:grid md:grid-rows-1 flex grid-cols-10 text-center w-full max-w-7xl overflow-x-hidden md:gap-9 gap-6 text-xs"
        id="categoriesContainer"
      >
        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path
              d="M224,64V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H216A8,8,0,0,1,224,64Z"
              opacity="0.2"
            ></path>
            <path d="M216,48H40A16,16,0,0,0,24,64V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM104,144V112h48v32Zm48,16v32H104V160ZM40,112H88v32H40Zm64-16V64h48V96Zm64,16h48v32H168Zm48-16H168V64h48ZM88,64V96H40V64ZM40,160H88v32H40Zm176,32H168V160h48v32Z"></path>
          </svg>
          <h1
            className={[
              path === "/"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2",
            ].join(" ")}
          >
            All
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/handtools")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M251.34,112,183.88,44.08a96.1,96.1,0,0,0-135.77,0l-.09.09L34.25,58.4A8,8,0,0,0,45.74,69.53L59.47,55.35a79.92,79.92,0,0,1,18.71-13.9L124.68,88l-96,96a16,16,0,0,0,0,22.63l20.69,20.69a16,16,0,0,0,22.63,0l96-96,14.34,14.34h0L200,163.3a16,16,0,0,0,22.63,0l28.69-28.69A16,16,0,0,0,251.34,112ZM60.68,216,40,195.31l68-68L128.68,148ZM162.34,114.32,140,136.67,119.31,116l22.35-22.35a8,8,0,0,0,0-11.32L94.32,35a80,80,0,0,1,78.23,20.41l44.22,44.51L188,128.66l-14.34-14.34A8,8,0,0,0,162.34,114.32Zm49,37.66-12-12L228,111.25l12,12Z"></path>
          </svg>
          <h1
            id="handTools"
            className={[
              path === "/handtools"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 ",
            ].join(" ")}
          >
            Hand Tools
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/powertools")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
          </svg>
          <h1
            id="handTools"
            className={[
              path === "/powertools"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 ",
            ].join(" ")}
          >
            Power Tools
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/materials")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,48H32a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H224a8,8,0,0,0,8-8V56A8,8,0,0,0,224,48ZM88,144V112h80v32Zm-48,0V112H72v32Zm144-32h32v32H184Zm32-16H136V64h80ZM120,64V96H40V64ZM40,160h80v32H40Zm96,32V160h80v32Z"></path>
          </svg>
          <h1
            className={[
              path === "/materials"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 text-center",
            ].join(" ")}
          >
            Construction{<br />}Materials
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/electrical")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M149.66,138.34a8,8,0,0,0-11.32,0L120,156.69,99.31,136l18.35-18.34a8,8,0,0,0-11.32-11.32L88,124.69,69.66,106.34a8,8,0,0,0-11.32,11.32L64.69,124,41.37,147.31a32,32,0,0,0,0,45.26l5.38,5.37-28.41,28.4a8,8,0,0,0,11.32,11.32l28.4-28.41,5.37,5.38a32,32,0,0,0,45.26,0L132,191.31l6.34,6.35a8,8,0,0,0,11.32-11.32L131.31,168l18.35-18.34A8,8,0,0,0,149.66,138.34Zm-52.29,65a16,16,0,0,1-22.62,0L52.69,181.25a16,16,0,0,1,0-22.62L76,135.31,120.69,180Zm140.29-185a8,8,0,0,0-11.32,0l-28.4,28.41-5.37-5.38a32.05,32.05,0,0,0-45.26,0L124,64.69l-6.34-6.35a8,8,0,0,0-11.32,11.32l80,80a8,8,0,0,0,11.32-11.32L191.31,132l23.32-23.31a32,32,0,0,0,0-45.26l-5.38-5.37,28.41-28.4A8,8,0,0,0,237.66,18.34Zm-34.35,79L180,120.69,135.31,76l23.32-23.31a16,16,0,0,1,22.62,0l22.06,22A16,16,0,0,1,203.31,97.37Z"></path>
          </svg>
          <h1
            className={[
              path === "/electrical" ? "border-primary" : "border-white",
              "border-b-2 ",
            ].join(" ")}
          >
            Electrical
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/plumbing")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M232,104H208V56h24a8,8,0,0,0,0-16H205.83A16,16,0,0,0,192,32H176a16,16,0,0,0-13.83,8H144A104.11,104.11,0,0,0,40,144v18.16A16,16,0,0,0,32,176v16a16,16,0,0,0,8,13.84V232a8,8,0,0,0,16,0V208h48v24a8,8,0,0,0,16,0V205.84A16,16,0,0,0,128,192V176a16,16,0,0,0-8-13.84V144a24,24,0,0,1,24-24h18.17A16,16,0,0,0,176,128h16a16,16,0,0,0,13.83-8H232a8,8,0,0,0,0-16ZM112,176v16H48V176Zm-8-32v16H56V144a88.1,88.1,0,0,1,88-88h16v48H144A40,40,0,0,0,104,144Zm72-32V48h16v63.8c0,.07,0,.13,0,.2Z"></path>
          </svg>
          <h1
            className={[
              path === "/plumbing"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 ",
            ].join(" ")}
          >
            Plumbing
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/fasteners")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M128,80a48,48,0,1,0,48,48A48.06,48.06,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm95.68-93.85L135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17h0a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,224,40,175.82V80.18L128,32l88,48.17v95.64Z"></path>
          </svg>
          <h1
            className={[
              path === "/fasteners"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 ",
            ].join(" ")}
          >
            Fasteners
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/safetygears")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,152V136a96.37,96.37,0,0,0-64-90.51V40a16,16,0,0,0-16-16H112A16,16,0,0,0,96,40v5.49A96.37,96.37,0,0,0,32,136v16a16,16,0,0,0-16,16v24a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V168A16,16,0,0,0,224,152Zm-16-16v16H160V62.67A80.36,80.36,0,0,1,208,136ZM144,40V152H112V40ZM48,136A80.36,80.36,0,0,1,96,62.67V152H48Zm176,56H32V168H224v24Z"></path>
          </svg>
          <h1
            className={[
              path === "/safetygears"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 ",
            ].join(" ")}
          >
            Safety gears
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/machineries")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M248,200h-8a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8h8a8,8,0,0,0,0-16h-8a24,24,0,0,0-24,24v8H199.2a40.09,40.09,0,0,0-33.71-31.61L129.44,49.85A16,16,0,0,0,114.67,40H24A16,16,0,0,0,8,56v96a40,40,0,0,0,32,64H160a40.07,40.07,0,0,0,39.2-32H216v8a24,24,0,0,0,24,24h8a8,8,0,0,0,0-16ZM148,136H64V56h50.67ZM48,56v80H40a39.72,39.72,0,0,0-16,3.35V56ZM160,200H40a24,24,0,0,1,0-48H160a24,24,0,0,1,0,48Zm8-24a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H160A8,8,0,0,1,168,176Z"></path>
          </svg>
          <h1
            className={[
              path === "/machineries"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 ",
            ].join(" ")}
          >
            machinery
          </h1>
        </span>

        <span
          className={`group flex items-center flex-col justify-between cursor-pointer text-gray-500 hover:bg-gray-100 rounded px-2`}
          onClick={() => router.replace("/others")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
          </svg>
          <h1
            className={[
              path === "/others"
                ? "border-primary"
                : "border-white group-hover:border-gray-100",
              "border-b-2 ",
            ].join(" ")}
          >
            Others
          </h1>
        </span>
      </div>
      <button className="btn btn-circle  md:hidden btn-xs" onClick={HandleNext}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#0f0f0f"
          viewBox="0 0 256 256"
        >
          <path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"></path>
        </svg>
      </button>
    </section>
  );
}

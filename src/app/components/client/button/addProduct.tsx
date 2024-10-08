"use client";
import { Category } from "@prisma/client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["600"] });

import { ChangeEvent, useState } from "react";
export default function AddProduct() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  function HandleReset() {
    const nameInput = document.getElementById("nameInput") as HTMLInputElement;
    const priceInput = document.getElementById(
      "priceInput",
    ) as HTMLInputElement;
    const stockInput = document.getElementById(
      "stockInput",
    ) as HTMLInputElement;
    const brandInput = document.getElementById(
      "brandInput",
    ) as HTMLInputElement;
    const imageUrlInput = document.getElementById(
      "imageUrlInput",
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "descriptionInput",
    ) as HTMLInputElement;

    const isFeaturedInput = document.getElementById(
      "isFeaturedInput",
    ) as HTMLInputElement;
    const categoryInput = document.getElementById(
      "categoryInput",
    ) as HTMLInputElement;
    nameInput.value = "";
    priceInput.value = "";
    stockInput.value = "";
    brandInput.value = "";
    imageUrlInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";
    isFeaturedInput.checked = false;
    HandleRemoveUrl();
  }

  async function HandleAdd(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const nameInput = document.getElementById("nameInput") as HTMLInputElement;
    const priceInput = document.getElementById(
      "priceInput",
    ) as HTMLInputElement;
    const stockInput = document.getElementById(
      "stockInput",
    ) as HTMLInputElement;
    const brandInput = document.getElementById(
      "brandInput",
    ) as HTMLInputElement;
    const thumbnailInput = document.getElementById(
      "imageUrlInput",
    ) as HTMLInputElement;
    const categoryInput = document.getElementById(
      "categoryInput",
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "descriptionInput",
    ) as HTMLInputElement;
    const isFeaturedInput = document.getElementById(
      "isFeaturedInput",
    ) as HTMLInputElement;
    const isAvailableInput = document.getElementById(
      "isAvailableInput",
    ) as HTMLInputElement;
    const otherUrlInput = document.getElementById("otherUrl") as HTMLDivElement;

    const name = nameInput.value;
    const price = priceInput.value;
    const stock = stockInput.value;
    const brand = brandInput.value;
    const thumbnail = thumbnailInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const isFeatured = isFeaturedInput.checked;
    const isAvailable = isAvailableInput.checked;
    let otherUrl: string[] = [];
    otherUrlInput.childNodes.forEach((input) => {
      const urlInput = input as HTMLInputElement;
      if (urlInput.value) otherUrl.push(urlInput.value);
    });
    const requiredInput = [
      nameInput,
      priceInput,
      stockInput,
      brandInput,
      thumbnailInput,
      categoryInput,
      descriptionInput,
    ];
    const result = requiredInput.every((input, index, inputArray) => {
      if (!input.value || input.value === "") {
        const splited = input.className.split(" ");
        splited.push("input-error select-error");
        input.className = splited.join(" ");
        return false;
      }
      return true;
    });

    if (!result) return; // exit function since requirements doesn't met
    setIsloading(true);

    const newProduct = JSON.stringify({
      name: name,
      price: parseFloat(price),
      stock: parseInt(stock),
      brand: brand,
      thumbnail: thumbnail,
      category: category,
      description: description,
      isFeatured: isFeatured,
      isAvailable: isAvailable,
      otherUrl: otherUrl,
    });

    const response = await fetch("/api/product/", {
      method: "POST",
      body: newProduct,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const insertedProduct = await response.json();
    console.log("Inserted Product:", insertedProduct);
    if (insertedProduct.ok) {
      HandleReset();
      setIsloading(false);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } else {
      setIsFailed(true);
      setTimeout(() => {
        setIsFailed(false);
      }, 3000);
    }
    setIsloading(false);
  }

  function HandleOnChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) {
    event.currentTarget.className = event.currentTarget.className.replace(
      "input-error",
      " ",
    );
  }
  function HandleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    event.currentTarget.className = event.currentTarget.className.replace(
      "select-error",
      " ",
    );
  }

  function HandleAddUrl() {
    const otherUrl = document.getElementById("otherUrl") as HTMLDivElement;
    const input = document.createElement("input");
    input.className = "input input-sm w-full input-bordered";
    otherUrl.appendChild(input);
  }

  function HandleRemoveUrl() {
    const otherUrl = document.getElementById("otherUrl") as HTMLDivElement;
    const length = otherUrl.children.length - 1;
    if (length) otherUrl.removeChild(otherUrl.children[length]);
    else (otherUrl.children[0] as HTMLInputElement).value = "";
  }

  return (
    <>
      {isSuccess ? (
        <div
          role="alert"
          className="alert shadow-lg fixed left-1/2 w-[96%] -translate-x-1/2  top-4 z-10 text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              color="currentColor"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>New Product Added!</span>
        </div>
      ) : null}
      {isFailed ? (
        <div
          role="alert"
          className="alert shadow-lg fixed left-1/2 w-[96%] -translate-x-1/2  top-4 z-10 text-contrast"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
          </svg>
          <span>Failed! Error happened during process.</span>
        </div>
      ) : null}

      <h1 className={`font-bold text-2xl my-2 ${inter.className}`}>
        Insert Product
      </h1>
      <section className="flex flex-col gap-2">
        <div className="h-max flex-col gap-2 grid grid-cols-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">name</span>
            </div>
            <input
              onChange={HandleOnChange}
              name="name"
              id="nameInput"
              className="input input-sm input-bordered"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">price</span>
            </div>
            <input
              id="priceInput"
              onChange={HandleOnChange}
              className="input input-sm input-bordered"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">stock</span>
            </div>
            <input
              id="stockInput"
              onChange={HandleOnChange}
              className="input input-sm input-bordered"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">brand</span>
            </div>
            <input
              onChange={HandleOnChange}
              id="brandInput"
              className="input input-sm input-bordered"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">thumbnail</span>
            </div>
            <input
              onChange={HandleOnChange}
              id="imageUrlInput"
              className="input input-sm input-bordered"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">category</span>
            </div>
            <select
              className="select-bordered select select-sm "
              id="categoryInput"
              onChange={HandleChangeCategory}
            >
              <option value={""} />
              <option value={Category.handtools}>Hand Tools</option>
              <option value={Category.powertools}>Power Tools</option>
              <option value={Category.materials}>Construction Materials</option>
              <option value={Category.electrical}>Electrical Tools</option>
              <option value={Category.plumbing}>Plumbing Tools</option>
              <option value={Category.fasteners}>Fasteners</option>
              <option value={Category.safetygears}>Safety Gear</option>
              <option value={Category.machineries}>Machinery</option>
              <option value={Category.others}>Other</option>
            </select>
          </label>

          <div className="col-span-2">
            <div className="label">
              <span className="label-text-alt">other url</span>
              <div className="flex gap-2">
                <button
                  className="btn btn-xs w-max self-end"
                  onClick={HandleAddUrl}
                >
                  add
                </button>
                <button
                  className="btn btn-xs w-max self-end btn-error"
                  onClick={HandleRemoveUrl}
                >
                  remove
                </button>
              </div>
            </div>
            <label className="form-control w-full flex gap-2" id="otherUrl">
              <input
                onChange={HandleOnChange}
                className="input input-sm w-full input-bordered"
              />
            </label>
          </div>

          <label className="form-control col-span-2 w-full">
            <div className="label">
              <span className="label-text-alt">Description</span>
            </div>
            <textarea
              onChange={HandleOnChange}
              id="descriptionInput"
              className="max-h-32 min-h-8 text-xs p-2 input input-bordered w-full"
            />
          </label>

          <div className="flex">
            <label className="w-full max-w-xs col-start-2 flex items-center justify-end gap-2">
              <div className="label cursor-pointer">
                <span className="label-text-alt">available?</span>
              </div>
              <input
                id="isAvailableInput"
                defaultChecked
                type="checkbox"
                className="checkbox checkbox-sm rounded-full"
              />
            </label>
            <label className="w-full max-w-xs col-start-2 flex items-center justify-end gap-2">
              <div className="label cursor-pointer">
                <span className="label-text-alt">featured?</span>
              </div>
              <input
                id="isFeaturedInput"
                type="checkbox"
                className="checkbox checkbox-sm rounded-full"
              />
            </label>
          </div>
        </div>
      </section>

      <div className="w-full flex gap-2 my-2">
        <button className="btn flex-1 bg-primary" onClick={HandleAdd}>
          {isLoading ? <span className="loading loading-spinner"></span> : null}
          Add product
        </button>
        <button className="btn" onClick={HandleReset}>
          reset
        </button>
      </div>
    </>
  );
}

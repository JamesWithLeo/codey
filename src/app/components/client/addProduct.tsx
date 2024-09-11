"use client";

import { ChangeEvent, MouseEventHandler, useState } from "react";

export default function AddProduct() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
    nameInput.value = "";
    priceInput.value = "";
    stockInput.value = "";
    brandInput.value = "";
    imageUrlInput.value = "";
    descriptionInput.value = "";
    isFeaturedInput.checked = false;
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
    const imageUrlInput = document.getElementById(
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
    const name = nameInput.value;
    const price = priceInput.value;
    const stock = stockInput.value;
    const brand = brandInput.value;
    const imageUrl = imageUrlInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const isFeatured = isFeaturedInput.checked;
    const requiredInput = [
      nameInput,
      priceInput,
      stockInput,
      brandInput,
      imageUrlInput,
      categoryInput,
      descriptionInput,
    ];
    const result = requiredInput.every((input, index, inputArray) => {
      if (!input.value) {
        const splited = input.className.split(" ");
        splited.push("input-error");
        input.className = splited.join(" ");
        return false;
      }
      return true;
    });
    if (!result) return; // exit function since requirements doesn't met
    setIsloading(true);
    console.log(event.target);
    const newProduct = {
      name: name,
      price: price,
      stock: stock,
      brand: brand,
      imageUrl: imageUrl,
      category: category,
      description: description,
      isFeatured: isFeatured,
    };
    const response = await fetch("/api/product/", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const insertedProduct = await response.json();
    console.log(insertedProduct);
    HandleReset();
    setIsloading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  }

  function HandleOnChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) {
    event.currentTarget.className = event.currentTarget.className.replace(
      "input-error",
      " ",
    );
  }

  return (
    <>
      {isSuccess ? (
        <div
          role="alert"
          className="alert shadow-lg fixed left-1/2 w-[96%] -translate-x-1/2  top-4 z-10"
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
              color="#FF8225"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>New Product Added!</span>
        </div>
      ) : null}
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
              <span className="label-text-alt">image url</span>
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
              className="select-bordered select select-sm"
              id="categoryInput"
            >
              <option>Hand Tools</option>
              <option>Power Tools</option>
              <option>Construction Materials</option>
              <option>Electrical Tools</option>
              <option>Plumbing Tools</option>
              <option>Fasteners</option>
              <option>Safety Gear</option>
              <option>Machinery</option>
            </select>
          </label>
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
        <div className="w-full flex gap-2">
          <button className="btn flex-1 bg-primary" onClick={HandleAdd}>
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : null}
            Add product
          </button>
          <button className="btn" onClick={HandleReset}>
            reset
          </button>
        </div>
      </section>
    </>
  );
}

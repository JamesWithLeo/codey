"use client";

export default function AddUser() {
  async function HandleCreate() {
    const firstname = document.getElementById(
      "firstnameInput",
    ) as HTMLInputElement;
    const lastname = document.getElementById(
      "lastnameInput",
    ) as HTMLInputElement;
    if (!firstname || !lastname) return;
    const newUser = { firstname: firstname.value, lastname: lastname.value };
    const response = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  }
  return (
    <>
      <label className="input input-bordered flex items-center gap-2 input-sm">
        <input
          type="text"
          className="grow text-xs"
          placeholder="first name"
          id="firstnameInput"
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 input-sm">
        <input
          type="text"
          className="grow text-xs"
          placeholder="last name"
          id="lastnameInput"
        />
      </label>

      <button onClick={HandleCreate} className="btn btn-sm text-sm">
        Create
      </button>
    </>
  );
}

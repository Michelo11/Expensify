import router from "next/router";
import { useState, useRef } from "react";

export default function CreateOrganizationModal() {
  const [name, setName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <dialog id="modal_create" className="modal modal-bottom sm:modal-middle">
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const form = new FormData();
          form.append("name", name);
          form.append("file", fileRef.current!.files![0]);
          const res = await fetch("/api/organizations/create", {
            body: form,
            method: "PUT",
          })
            .then((res) => res.json())
            .then((org) => {
              (
                document.getElementById("modal_create") as HTMLDialogElement
              )?.close();
              router.push(`/${org.id}/dashboard`);
            });
        }}
        className="modal-box"
      >
        <h3 className="font-bold text-lg">Create new organization</h3>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is your organization name?</span>
          </label>
          <input
            required
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Upload an avatar</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            ref={fileRef}
          />
        </div>
        <div className="modal-action">
          <div className="flex gap-3">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <button
              onClick={() =>
                (
                  document.getElementById("modal_create") as HTMLDialogElement
                )?.close()
              }
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}

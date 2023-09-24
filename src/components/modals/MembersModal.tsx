import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Organization, User, Member } from "@prisma/client";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import { AlertDanger } from "../Alert";

export default function MembersModal({
  editing,
}: {
  editing?: Organization & {
    members: (Member & {
      user: User;
    })[];
  };
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  return (
    <dialog id="modal_members" className="modal modal-bottom sm:modal-middle">
      <AlertDanger message={error} active={error} />
      <div className="modal-box bg-modal flex flex-col gap-4">
        <h3 className="font-bold text-lg">Manage or add a new member</h3>

        <div className="flex flex-col gap-2 w-full p-2 rounded-lg">
          {editing?.members.map((member) => (
            <div className="flex items-center gap-2" key={member.id}>
              <Image
                src={
                  member.user?.image ||
                  "https://ui-avatars.com/api/?background=random&name=" +
                    member.user?.name
                }
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-xl"
              />
              <p>{member.user?.name}</p>

              <button
                className="ml-auto"
                onClick={() => {
                  fetch(
                    `/api/organizations/${editing.id}/members/delete?member=${member.id}`,
                    {
                      method: "DELETE",
                    }
                  ).then((res) => {
                    if (res.status === 200) router.reload();
                    else {
                      res.json().then((json) => setError(json.message));
                      setTimeout(() => setError(""), 2000);
                    }
                  });
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>

        <div className="divider">OR</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch(`/api/organizations/invites/create`, {
              method: "POST",
              body: JSON.stringify({ email }),
            }).then(async (res) => {
              if (res.status === 200) {
                router.reload();
              }
            });
          }}
          className="form-control w-full"
        >
          <input
            type="email"
            placeholder="Invite a new member"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Invite
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                (
                  document.getElementById("modal_members") as HTMLDialogElement
                ).close();
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

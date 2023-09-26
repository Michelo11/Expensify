import { faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Organization } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

export default function OrganizationsModal({
  organizations,
}: {
  organizations: Organization[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Organization | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  return (
    <dialog
      id="modal_organizations"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-modal flex flex-col">
        <h3 className="font-bold text-lg">
          Switch to another account or add a new one
        </h3>

        {organizations && (
          <>
            {organizations.map((org: Organization) => {
              return (
                <div className="flex items-center gap-3" key={org.id}>
                  <button
                    className="flex items-center mt-2 gap-2 btn-ghost w-full p-2 rounded-lg"
                    onClick={() => {
                      router
                        .push(`/${org.id}/dashboard`)
                        .then(() => router.reload());
                    }}
                  >
                    <div className="rounded-xl">
                      <Image
                        src={
                          org.avatarUrl ||
                          "https://ui-avatars.com/api/?background=random&name=" +
                            org.name
                        }
                        width={36}
                        height={36}
                        draggable={false}
                        alt="logo"
                        className="rounded-xl w-[36px] h-[36px]"
                      />
                    </div>
                    <p>{org.name}</p>
                  </button>
                  <button
                    className="ml-auto"
                    onClick={() => {
                      (
                        document.getElementById(
                          "modal_organizations"
                        ) as HTMLDialogElement
                      ).close();
                      (
                        document.getElementById(
                          "modal_settings"
                        ) as HTMLDialogElement
                      ).showModal();
                      setEditing(org);
                    }}
                  >
                    <FontAwesomeIcon icon={faGear} />
                  </button>
                  <button
                    className="ml-auto"
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      fetch("/api/organizations/delete?id=" + org.id, {
                        method: "DELETE",
                      }).then(async (res) => {
                        if (res.status === 200) {
                          router
                            .push("/autoswitch")
                            .then(() => router.reload());
                        } else {
                          const data = await res.json();
                          window.location.href = `${
                            router.asPath.split("?")[0]
                          }?error=${data.message}`;
                        }
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              );
            })}
          </>
        )}
        <dialog
          id="modal_settings"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-modal flex flex-col">
            <h3 className="font-bold text-lg">Organization settings</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Rename your organization?</span>
              </label>
              <input
                type="text"
                placeholder={editing?.name}
                className="input input-bordered w-full"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Change avatar</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                ref={avatarRef}
              />
            </div>

            <div className="modal-action">
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const data = new FormData();
                    data.append("name", name);
                    if (avatarRef.current?.files) {
                      data.append("file", avatarRef.current.files[0]);
                    }

                    fetch(`/api/organizations/${editing?.id}/update`, {
                      method: "POST",
                      body: data,
                    }).then(async (res) => {
                      if (res.status === 200) {
                        router.reload();
                      }
                    });
                  }}
                  className="btn btn-primary"
                >
                  Save
                </button>
                <button
                  onClick={() =>
                    (
                      document.getElementById(
                        "modal_settings"
                      ) as HTMLDialogElement
                    ).close()
                  }
                  className="btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </dialog>
        <div className="modal-action">
          <div className="flex gap-3">
            <button
              onClick={() => {
                (
                  document.getElementById(
                    "modal_organizations"
                  ) as HTMLDialogElement
                ).close();
                setTimeout(
                  () =>
                    (
                      document.getElementById(
                        "modal_create"
                      ) as HTMLDialogElement
                    ).showModal(),
                  100
                );
              }}
              className="btn btn-primary"
            >
              Add new
            </button>
            <button
              onClick={() =>
                (
                  document.getElementById(
                    "modal_organizations"
                  ) as HTMLDialogElement
                ).close()
              }
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

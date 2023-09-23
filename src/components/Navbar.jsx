import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useFetcher } from "../utils/fetcher";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlertDanger } from "../components/Alert";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: organizations } = useFetcher("/api/organizations");
  const { data: organization } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}`
  );
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (organization) {
      setAvatar(
        organization.avatarUrl ||
          "https://ui-avatars.com/api/?background=random&name=" +
            organization.name
      );
    }
  }, [organization]);

  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error);
      setTimeout(() => {
        setError(null);

        const location = router.asPath.split("?")[0];
        router.replace(location, undefined, { shallow: true });
      }, 2000);
    }
  }, [router.query]);

  if (session) {
    return (
      <div className="navbar no-padding">
        {error && <AlertDanger message={error} active={true} />}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border-neutral border-2"
            >
              {organization?.ready && (
                <>
                  <li>
                    <a
                      href={
                        organization?.id
                          ? `/${organization.id}/dashboard`
                          : "/autoswitch"
                      }
                      className="p-2"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href={`./transactions`} className="p-2">
                      Transactions
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        document
                          .getElementById("create_transaction")
                          .showModal()
                      }
                      className="p-2"
                    >
                      New
                    </button>
                  </li>
                  <li>
                    <a href={`./settings`} className="p-2">
                      Settings
                    </a>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => signOut()} className="p-2">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Expensify</a>
        </div>
        <div className="navbar-end gap-2">
          <button onClick={() => document.getElementById("orgs").showModal()}>
            <div className="rounded-xl">
              <Image
                src={
                  avatar ||
                  "https://ui-avatars.com/api/?background=random&name=Undefined"
                }
                width={36}
                height={36}
                draggable={false}
                alt="logo"
                className="rounded-xl"
              />
            </div>
          </button>
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => document.getElementById("notifications").showModal()}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <dialog
            id="notifications"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <dialog id="orgs" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Switch to another account or add a new one
            </h3>
            {organizations && (
              <>
                {organizations.map((org) => {
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
                            className="rounded-xl"
                          />
                        </div>
                        <p>{org.name}</p>
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
            <div className="modal-action">
              <form method="dialog">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setTimeout(
                        () =>
                          document.getElementById("modal_create").showModal(),
                        100
                      );
                    }}
                    className="btn btn-primary"
                  >
                    Add new
                  </button>
                  <button className="btn">Close</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
        <dialog
          id="modal_create"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create new organization</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  What is your organization name?
                </span>
              </label>
              <input
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
              <form method="dialog">
                <div className="flex gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={async (e) => {
                      const form = new FormData();
                      form.append("name", name);
                      form.append("file", fileRef.current.files[0]);
                      const res = await fetch("/api/organizations/create", {
                        body: form,
                        method: "PUT",
                      })
                        .then((res) => res.json())
                        .then((org) => router.push(`/${org.id}/dashboard`));
                    }}
                  >
                    Create
                  </button>
                  <button className="btn">Close</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
  }
  return (
    <div className="navbar no-padding">
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Expensify
        </a>
      </div>
    </div>
  );
}

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertDanger } from "./Alert";
import { useFetcher } from "../utils/fetcher";
import CreateOrganizationModal from "./modals/CreateOrganizationModal";
import NotificationsModal from "./modals/NotificationsModal";
import OrganizationsModal from "./modals/OrganizationsModal";
import MembersModal from "./modals/MembersModal";
import type { Notification } from "@prisma/client";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: organizations } = useFetcher("/api/organizations");
  const { data: organization } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}`
  );
  const { data: notifications }: { data?: Notification[] } =
    useFetcher("/api/notifications");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");

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
      setError(router.query.error as string);
      setTimeout(() => {
        setError("");

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
                        (
                          document.getElementById(
                            "modal_members"
                          ) as HTMLDialogElement
                        ).showModal()
                      }
                      className="p-2"
                    >
                      Members
                    </button>
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
          <button
            onClick={() =>
              (
                document.getElementById(
                  "modal_organizations"
                ) as HTMLDialogElement
              ).showModal()
            }
          >
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
                className="rounded-xl w-[36px] h-[36px]"
              />
            </div>
          </button>

          {organization?.ready && (
            <>
              <button
                className="btn btn-ghost btn-circle"
                onClick={() =>
                  (
                    document.getElementById(
                      "create_transaction"
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                <div className="indicator">
                  <FontAwesomeIcon icon={faPlus} className="text-xl" />
                </div>
              </button>

              <button
                className="btn btn-ghost btn-circle"
                onClick={() =>
                  (
                    document.getElementById(
                      "modal_notifications"
                    ) as HTMLDialogElement
                  ).showModal()
                }
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
                  {notifications && notifications.length > 0 && (
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  )}
                </div>
              </button>
            </>
          )}

          <NotificationsModal notifications={notifications} />
        </div>

        <OrganizationsModal organizations={organizations} />
        <CreateOrganizationModal />
        <MembersModal editing={organization} />
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

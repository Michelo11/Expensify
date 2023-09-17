import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="navbar no-padding">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-modal rounded-box w-52"
            >
              <li>
                <a href="/">Dashboard</a>
              </li>
              <li>
                <a href="#">Transactions</a>
              </li>
              <li>
                <a href="#">New</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            Expensify
          </a>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-circle"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <div className="rounded-xl">
              <Image
                src="/LogoPersonal.png"
                width={36}
                height={36}
                draggable={false}
                alt="logo"
                className="rounded-xl"
              />
            </div>
          </button>
          <button className="btn btn-ghost btn-circle">
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
        </div>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Switch to another account or add a new one
            </h3>
            <button className="flex items-center mt-2 gap-2 btn-ghost w-full p-2 rounded-lg">
              <div className="rounded-xl">
                <Image
                  src="/LogoPersonal.png"
                  width={36}
                  height={36}
                  draggable={false}
                  alt="logo"
                  className="rounded-xl"
                />
              </div>
              <p>Michele</p>
            </button>
            <div className="modal-action">
              <form method="dialog">
                <div className="flex gap-3">
                  <button className="btn btn-primary">Add new</button>
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

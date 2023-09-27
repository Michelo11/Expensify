import { signIn } from "next-auth/react";
import { AlertDanger } from "../components/Alert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Landing() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (router.query.error) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        router.replace("/");
      }, 2000);
    }
  }, [router.query.error, router]);

  return (
    <div className="hero my-auto flex flex-col items-center justify-center">
      <AlertDanger
        message={"An error occurred please try again"}
        active={active}
      />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            In order to try our amazing app, you need to create an account
            first.
          </p>
          <button
            onClick={() =>
              (document.getElementById("login") as any).showModal()
            }
            className="btn btn-primary"
          >
            Get Started
          </button>
          <dialog
            id="login"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box bg-modal flex flex-col gap-4">
              <h3 className="font-bold text-lg">Login or Signup</h3>
              <p>Select a method below to login into your account</p>
              <button
                onClick={() =>
                  signIn("github", { callbackUrl: "/autoswitch?success=true" })
                }
                className="btn btn-black"
              >
                GitHub
              </button>
              <button
                onClick={() =>
                  signIn("discord", { callbackUrl: "/autoswitch?success=true" })
                }
                className="btn btn-primary"
              >
                Discord
              </button>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}

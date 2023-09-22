import { useEffect, useState } from "react";
import { AlertDanger } from "./Alert";
import { useRouter } from "next/router";

function submitData(type, organization, setError, setKey, id, secret) {
  fetch(`/api/organizations/${organization}/type`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type.toUpperCase(),
      clientId: id,
      clientSecret: secret,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) setError(res.message);
      else {
        setKey(res.key);
        document.getElementById("api_modal").showModal();
      }
    });
}

function Card({
  name,
  description,
  organization,
  setKey,
  setError,
  setSelected,
}) {
  return (
    <div className="card w-96 bg-modal shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (
                name.toLowerCase() === "stripe" ||
                name.toLowerCase() === "paypal"
              ) {
                setSelected(name.toUpperCase());
                document.getElementById("integration_modal").showModal();
                return;
              }

              submitData(
                name.toUpperCase(),
                organization,
                setError,
                setKey,
                undefined,
                undefined
              );
            }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SelectIntegrations({ organization }) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [secret, setSecret] = useState("");
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  return (
    <div>
      <h1 className="big-text mb-6 mt-6">Select an intergation type</h1>
      <div className="flex gap-8">
        <AlertDanger message={error} active={error !== ""} />
        <Card
          name={"PayPal"}
          description={
            "Use PayPal to integrate your payment logs into our platform."
          }
          setSelected={setSelected}
          organization={organization}
          setError={setError}
          setKey={setKey}
        />
        <Card
          name={"Stripe"}
          description={
            "Use Stripe to integrate your payment logs into our platform."
          }
          setSelected={setSelected}
          organization={organization}
          setError={setError}
          setKey={setKey}
        />

        <Card
          name={"API"}
          description={
            "Use our API to integrate your payment logs into our platform."
          }
          setSelected={setSelected}
          organization={organization}
          setError={setError}
          setKey={setKey}
        />
        <Card
          name={"Manual"}
          description={
            "Add transactions manually into our dashboard without any automatic integration."
          }
          setSelected={setSelected}
          organization={organization}
          setError={setError}
          setKey={setKey}
        />
      </div>
      <dialog
        id="integration_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Enter your Client ID and Secret ID
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Client ID</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label className="label">
              <span className="label-text">Secret ID</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <p className="py-4">
              Don't know how to get these infos?{" "}
              <a
                href={
                  selected === "PAYPAL"
                    ? "https://developer.paypal.com/api/rest/#link-getclientidandclientsecret"
                    : "https://stripe.com/docs/keys"
                }
                className="text-primary hover:underline"
              >
                Click here
              </a>
            </p>
            <div className="modal-action">
              <form method="dialog">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      submitData(
                        selected,
                        organization,
                        setError,
                        setKey,
                        id,
                        secret
                      );
                    }}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <button className="btn">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      <dialog id="api_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Your API credentials</h3>
          <div className="form-control">
            <div className="modal-action">
              <form method="dialog">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      router.reload();
                    }}
                    className="btn"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

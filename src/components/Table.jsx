import React, { useState } from "react";
import TableRow from "./TableRow";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { AlertDanger } from "./Alert";

export default function Table({ transactions, organization, limit }) {
  const [selected, setSelected] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [action, setAction] = useState("DEPOSIT");
  const [error, setError] = useState("");

  let contextTrigger = null;
  let contextMenu = null;

  const toggleMenu = (e) => {
    if (contextTrigger && contextMenu) {
      if (contextMenu.state.isVisible) {
        contextTrigger.handleContextClick(e);
      }
    }
  };

  return (
    <div className="overflow-x-auto" >
      <AlertDanger message={error} active={error != ""} />

      <ContextMenuTrigger id={"transactions"} ref={(c) => (contextTrigger = c)}>
        <table className="table" onClick={(e) => {
          toggleMenu(e);
        }}>
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelected(transactions.map((t) => t.id));
                      } else {
                        setSelected([]);
                      }
                    }}
                  />
                </label>
              </th>
              <th className="text-white text-base font-normal">Description</th>
              <th className="text-white text-base font-normal">Date</th>
              <th className="text-white text-base font-normal">Amount</th>
              <th className="text-white text-base font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction, i) => {
                return (
                  <TableRow
                    selected={selected}
                    setSelected={setSelected}
                    description={transaction.description}
                    date={transaction.createdAt}
                    amount={transaction.amount}
                    action={transaction.action}
                    id={transaction.id}
                    i={i}
                    key={transaction.id}
                    latest={transactions.length - 1 === i}
                  />
                );
              })
            ) : (
              <tr className="border-none">
                <td colSpan="5" className="text-center">
                  <button
                    className="btn btn-primary m-6 mx-auto"
                    onClick={() =>
                      document.getElementById("create_transaction").showModal()
                    }
                  >
                    Add new
                  </button>
                </td>
              </tr>
            )}
            {transactions && limit && transactions.length >= 5 ? (
              <tr className="border-none">
                <td colSpan="5" className="text-center">
                  <a
                    className="btn btn-primary m-2 mx-auto"
                    href="./transactions"
                  >
                    View all
                  </a>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </ContextMenuTrigger>
      <dialog
        id="create_transaction"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="form-control w-full">
            <h3 className="font-bold text-lg">New transaction</h3>
            <form
              className="w-full flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                fetch(
                  `/api/organizations/${organization}/transactions/create`,
                  {
                    method: "PUT",
                    body: JSON.stringify({
                      description,
                      amount,
                      action,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                ).then(() => location.reload());
              }}
            >
              <label className="label">
                <span className="label-text">Description:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label className="label">
                <span className="label-text">Amount:</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={1}
              />
              <label className="label">
                <span className="label-text">Select action:</span>
              </label>
              <select
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                }}
                className="select select-bordered w-full"
                required
              >
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAW">Withdraw</option>
              </select>

              <div className="flex gap-2 mt-4 ml-auto items-center">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("create_transaction").close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <dialog
        id="edit_transaction"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="form-control w-full">
            <h3 className="font-bold text-lg">Edit transaction</h3>
            <form
              className="w-full flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                fetch(
                  `/api/organizations/${organization}/transactions/update`,
                  {
                    method: "PATCH",
                    body: JSON.stringify({
                      id: selected[0],
                      description,
                      amount,
                      action,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                ).then(() => location.reload());
              }}
            >
              <label className="label">
                <span className="label-text">Description:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label className="label">
                <span className="label-text">Amount:</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={1}
              />
              <label className="label">
                <span className="label-text">Select action:</span>
              </label>
              <select
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                }}
                className="select select-bordered w-full"
                required
              >
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAW">Withdraw</option>
              </select>

              <div className="flex gap-2 mt-4 ml-auto items-center">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("edit_transaction").close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <ContextMenu
        id={"transactions"}
        className="bg-[#222222] p-1 w-48 rounded-lg z-50"
        ref={(c) => (contextMenu = c)}
      >
        <MenuItem
          onClick={(e) => {
            fetch(`/api/organizations/${organization}/transactions/delete`, {
              method: "DELETE",
              body: JSON.stringify({
                items: selected,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(() => location.reload());
          }}
          className="btn w-full bg-[#222222] border-none"
        >
          <p className="text-left w-full">Delete</p>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            if (selected.length == 0) {
              setError("Please select an item!");
              setTimeout(() => setError(""), 2000);
              return;
            }

            if (selected.length > 1) {
              setError("You can only edit one item at once!");
              setTimeout(() => setError(""), 2000);
              return;
            }

            const transaction = transactions.find((t) => t.id === selected[0]);
            setDescription(transaction.description);
            setAmount(transaction.amount);
            setAction(transaction.action);
            document.getElementById("edit_transaction").showModal();
          }}
          className="btn w-full bg-[#222222] border-none"
        >
          <p className="text-left w-full">Edit</p>
        </MenuItem>
      </ContextMenu>
    </div>
  );
}

import React, { useState } from "react";
import TableRow from "./TableRow";

export default function Table({ transactions, organization }) {
  const [selected, setSelected] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("PENDING");
  const [action, setAction] = useState("DEPOSIT");

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected([1, 2, 3, 4, 5]);
                    } else {
                      setSelected([]);
                    }
                  }}
                />
              </label>
            </th>
            <th className="text-white text-base font-normal">Name</th>
            <th className="text-white text-base font-normal">Date</th>
            <th className="text-white text-base font-normal">Amount</th>
            <th className="text-white text-base font-normal">Status</th>
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
                  status={transaction.status}
                  i={i}
                  key={transaction.id}
                  latest={transactions.length -1 === i}
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
        </tbody>
      </table>
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
                      status,
                      action,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    
                    }
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
              />
              <label className="label">
                <span className="label-text">Select status:</span>
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="select select-bordered w-full"
              >
                <option selected value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
              </select>
              <label className="label">
                <span className="label-text">Select action:</span>
              </label>
              <select
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                }}
                className="select select-bordered w-full"
              >
                <option selected value="DEPOSIT">Deposit</option>
                <option value="WITHDRAW">Withdraw</option>
              </select>

              <div className="flex gap-2 mt-4 ml-auto items-center">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>

                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

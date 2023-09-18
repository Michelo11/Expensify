import React, { useState } from "react";

export default function Table() {
  const [selected, setSelected] = useState([]);

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
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selected.includes(1)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected([...selected, 1]);
                    } else {
                      setSelected(selected.filter((item) => item !== 1));
                    }
                  }}
                />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/LogoPersonal.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
            </td>
            <td>$25</td>
            <th>
              <div className="badge badge-error gap-2">
                <p className="font-normal">Cancelled</p>
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selected.includes(2)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected([...selected, 2]);
                    } else {
                      setSelected(selected.filter((item) => item !== 2));
                    }
                  }}
                />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/LogoPersonal.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
              <br />
            </td>
            <td>$12.25</td>
            <th>
              <div className="badge badge-error gap-2">
                <p className="font-normal">Cancelled</p>
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selected.includes(3)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected([...selected, 3]);
                    } else {
                      setSelected(selected.filter((item) => item !== 3));
                    }
                  }}
                />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/LogoPersonal.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
              <br />
            </td>
            <td>$55</td>
            <th>
              <div className="badge badge-success gap-2">
                <p className="font-normal">Received</p>
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selected.includes(4)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected([...selected, 4]);
                    } else {
                      setSelected(selected.filter((item) => item !== 4));
                    }
                  }}
                />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/LogoPersonal.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
              <br />
            </td>
            <td>$72</td>
            <th>
              <div className="badge badge-success gap-2">
                <p className="font-normal">Received</p>
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selected.includes(5)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected([...selected, 5]);
                    } else {
                      setSelected(selected.filter((item) => item !== 5));
                    }
                  }}
                />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/LogoPersonal.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
              <br />
            </td>
            <td>$10</td>
            <th>
              <div className="badge badge-warning gap-2">
                <p className="font-normal">Sending</p>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

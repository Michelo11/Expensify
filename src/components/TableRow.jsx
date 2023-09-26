import moment from "moment";

export default function TableRow({
  description,
  date,
  amount,
  action,
  selected,
  setSelected,
  i,
  id,
  latest,
}) {
  return (
    <tr className={latest ? "border-none" : ""}>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={selected.includes(id)}
            onChange={(event) => {
              if (event.target.checked) {
                setSelected([...selected, id]);
              } else {
                setSelected(selected.filter((item) => item !== id));
              }
            }}
          />
        </label>
      </th>
      <td>
        <div className="font-bold">{description}</div>
      </td>
      <td>
        {moment(date).format("DD MMMM YYYY")}
        <br />
      </td>
      <td>${amount}</td>
      <th>
        <div
          className={
            "badge gap-2" +
            (action === "WITHDRAW" ? " badge-error" : " badge-success")
          }
        >
          <p className="font-normal">{action}</p>
        </div>
      </th>
    </tr>
  );
}

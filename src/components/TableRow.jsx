export default function TableRow({
  description,
  date,
  amount,
  status,
  selected,
  setSelected,
  i,
  latest,
}) {
  return (
    <tr className={latest ? "border-none" : ""}>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={selected.includes(i + 1)}
            onChange={(event) => {
              if (event.target.checked) {
                setSelected([...selected, i + 1]);
              } else {
                setSelected(selected.filter((item) => item !== i + 1));
              }
            }}
          />
        </label>
      </th>
      <td>
        <div className="font-bold">{description}</div>
      </td>
      <td>
        {date}
        <br />
      </td>
      <td>${amount}</td>
      <th>
        <div className="badge badge-warning gap-2">
          <p className="font-normal">{status}</p>
        </div>
      </th>
    </tr>
  );
}

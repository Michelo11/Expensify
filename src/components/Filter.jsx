import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Filter({ selected, setSelected }) {
  return (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end ">
      <label tabIndex={0} className="btn m-1 bg-modal hover:bg-modal">
        {selected === "week" ? "This Week" : selected==="month" ? "This Month" : "All time"}
        <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border-neutral border-2 gap-2"
      >
        <li>
          <button onClick={() => setSelected("week")}>This week</button>
        </li>
        <li>
          <button onClick={() => setSelected("month")}>This month</button>
        </li>
        <li>
          <button onClick={() => setSelected("all")}>All time</button>
        </li>
      </ul>
    </div>
  );
}

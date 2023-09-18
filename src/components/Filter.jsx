import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Filter() {
  return (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end ">
      <label tabIndex={0} className="btn m-1 bg-modal hover:bg-modal">
        Last 30 days
        <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border-neutral border-2"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}

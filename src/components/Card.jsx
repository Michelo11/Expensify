import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Card({ title, value }) {
  return (
    <div className="card w-full bg-modal shadow-xl">
      <div className="card-body">
        <h2>{title}</h2>
        <p className="text-3xl font-semibold">${value}</p>
    
      </div>
    </div>
  );
}

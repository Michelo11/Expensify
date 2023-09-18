import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  pieHole: 0.4,
  is3D: false,
  backgroundColor: "transparent",
  legend: "none",
};

export default function Stats() {
  return (
    <div className="card h-1/2 bg-modal shadow-xl mt-6">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ReactChart() {
  return (
    <Chart
      options={{
        colors: ["#007AFF", "#004896"],
        dataLabels: {
          enabled: false,
        },
        theme: {
          mode: "dark",
        },
        chart: {
          type: "area",
          foreColor: "#ccc",
          toolbar: {
            show: false,
          },
          background: "#18181B",
          zoom: {
            enabled: false
          }
        },
        labels: [],
        stroke: {
          curve: "smooth",
        },
        grid: {
          show: false,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          show: false,
          labels: {
            show: false
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },

        },
        legend: {
            fontSize: 17,
            offsetY: 10,
            fontWeight: 400,
        }
      }}
      series={[
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ]}
      type="area"
      width={"100%"}
      height={450}
      
    />
  );
}

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Chart({ income, outcome }) {
  return (
    <div className="card h-1/2 py-10 bg-modal shadow-xl mt-6 flex flex-col items-center">
      <ReactApexChart
        options={{
          chart: {
            width: 380,
            type: "donut",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: false,
          },
          plotOptions: {
            pie: {
              expandOnClick: false,
            },
          },
          states: {
            active: {
              filter: {
                type: "none",
              },
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
          legend: {
            position: "right",
            offsetY: 0,
            height: 230,
            labels: {
              colors: ["#fff", "#fff", "#fff", "#fff"],
            },
            customLegendItems:
              income > 0 || outcome > 0
                ? ["Income", "Outcome"]
                : ["Total balance"],
          },
          labels:
            income > 0 || outcome > 0
              ? ["Income", "Outcome"]
              : ["Total balance"],
          colors: income > 0 || outcome > 0 ? undefined : ["#222222"],
        }}
        series={income > 0 || outcome > 0 ? [income, outcome] : [100]}
        type="donut"
        width={380}
      />
    </div>
  );
}

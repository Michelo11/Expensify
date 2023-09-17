import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertSuccess } from "../components/Alert";
import Card from "../components/Card";
import Chart from "../components/Chart";
import Table from "../components/Table";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (router.query.success) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        router.replace("/dashboard");
      }, 2000);
    }
  }, [router.query.success]);
  return (
    <div className="flex gap-8">
      <AlertSuccess message={"Authenticated successfully"} active={active} />
      <div className="w-3/4">
        <h1 className="big-text">Financial record</h1>
        <div className="flex gap-6 mt-3">
          <Card title={"Total balance"} value={100} positive={true} />
          <Card title={"Total spent"} value={70} positive={false} />
          <Card title={"Total saving"} value={23} positive={true} />
        </div>
        <div className="mt-3 w-full">
          <h1 className="big-text mb-3">Statistic</h1>
          <div className="h-full w-full p-2 bg-modal rounded-xl mb-2">
            <Chart />
          </div>
        </div>
        <div>
          <h1 className="big-text mb-3">Recent transactions</h1>
          <div className="h-full w-full p-2 bg-modal rounded-xl mb-2">
            <Table />
          </div>
        </div>
      </div>
      <div className="w-1/4">
        <h1 className="big-text mb-3">My wallet</h1>

      </div>
    </div>
  );
}

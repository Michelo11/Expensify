import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertSuccess } from "../components/Alert";
import Card from "../components/Card";
import Chart from "../components/Chart";
import Table from "../components/Table";
import Filter from "../components/Filter";
import Wallet from "../components/Wallet";
import Stats from "../components/Stats";
import { useSession } from "next-auth/react";

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
        <div className="flex items-center justify-between">
          <h1 className="big-text mt-4">Financial record</h1>
          <Filter />
        </div>
        <div className="flex gap-6 mt-6">
          <Card title={"Total balance"} value={100} positive={true} />
          <Card title={"Total spent"} value={70} positive={false} />
          <Card title={"Total saving"} value={23} positive={true} />
        </div>
        {/*
        <div className="mt-3 w-full">
          <h1 className="big-text mb-3">Statistic</h1>
          <div className="h-full w-full p-2 bg-modal rounded-xl mb-2">
            <Chart />
          </div>
        </div>
        */}
        <div>
          <h1 className="big-text mb-6 mt-6">Recent transactions</h1>
          <div className="h-full w-full p-2 bg-modal rounded-xl mb-2">
            <Table />
          </div>
        </div>
      </div>
      <div className="w-1/4">
        <div>
          <h1 className="big-text mt-2">My wallet</h1>
          <Wallet />
        </div>
        <div>
          <h1 className="big-text mt-6">My stats</h1>
          <Stats />
        </div>
      </div>
    </div>
  );
}

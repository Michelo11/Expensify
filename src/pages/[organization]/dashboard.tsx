import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertSuccess } from "../../components/Alert";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Filter from "../../components/Filter";
import Wallet from "../../components/Wallet";
import Stats from "../../components/Stats";
import { useFetcher } from "@/utils/fetcher";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { data: organization } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}`
  );
  const { data: transactions } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}/transactions`
  );
  useEffect(() => {
    if (router.query.success) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        router.replace(`/${router.asPath.split("?")[0]}}`);
      }, 2000);
    }
  }, [router.query.success]);
  if (!organization)
    return (
      <span className="loading loading-spinner text-primary loading-lg fixed top-1/2 left-1/2"></span>
    );
  return (
    <div className="flex gap-8">
      <AlertSuccess message={"Authenticated successfully"} active={active} />
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <h1 className="big-text mt-4">Financial record</h1>
          <Filter />
        </div>
        <div className="flex gap-6 mt-6">
          <Card
            title={"Total balance"}
            value={organization.balance}
            positive={true}
          />
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
            <Table transactions={transactions} organization={organization.id} />
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

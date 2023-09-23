import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertSuccess } from "../../components/Alert";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Filter from "../../components/Filter";
import Wallet from "../../components/Wallet";
import Stats from "../../components/Stats";
import SelectIntegrations from "../../components/SelectIntegrations";
import { useFetcher } from "@/utils/fetcher";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("week");
  const org = router.asPath.split("/")[1];
  const { data: organization } = useFetcher(
    org !== "[organization]"
      ? `/api/organizations/${router.asPath.split("/")[1]}`
      : undefined
  );
  const { data: transactions } = useFetcher(
    org !== "[organization]"
      ? `/api/organizations/${router.asPath.split("/")[1]}/transactions?limit=5`
      : undefined
  );
  const { data: balance } = useFetcher(
    `/api/organizations/${
      router.asPath.split("/")[1]
    }/balance?range=${selected}`
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
  if (!organization.ready) {
    return <SelectIntegrations organization={organization.id} />;
  }
  return (
    <div className="flex gap-8">
      <AlertSuccess message={"Authenticated successfully"} active={active} />
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <h1 className="big-text mt-4">Financial record</h1>
          <Filter selected={selected} setSelected={setSelected} />
        </div>
        <div className="flex gap-6 mt-6">
          <Card title={"Total balance"} value={balance?.balance} />
          <Card title={"Total spent"} value={balance?.expenses} />
          <Card title={"Total saving"} value={balance?.savings} />
        </div>
        <div>
          <h1 className="big-text mb-6 mt-6">Recent transactions</h1>
          <div className="h-full w-full p-2 bg-modal rounded-xl mb-2">
            <Table
              limit={true}
              transactions={transactions}
              organization={organization.id}
            />
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

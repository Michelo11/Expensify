import { useFetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import Table from "../../components/Table";

export default function Transactions() {
  const router = useRouter();

  const { data: organization } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}`
  );
  const { data: transactions } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}/transactions`
  );

  if (!organization)
    return (
      <span className="loading loading-spinner text-primary loading-lg fixed top-1/2 left-1/2"></span>
    );

  return (
    <div>
      <h1 className="big-text mb-6 mt-6">Recent transactions</h1>
      <div className="h-full w-full p-2 bg-modal rounded-xl mb-2">
        <Table
          transactions={transactions}
          organization={organization.id}
          limit={false}
        />
      </div>
    </div>
  );
}

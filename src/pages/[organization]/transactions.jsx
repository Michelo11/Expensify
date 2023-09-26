import { useFetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useState } from "react";
import Table from "../../components/Table";

export default function Transactions() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const { data: organization } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}`
  );
  const { data: transactions } = useFetcher(
    `/api/organizations/${
      router.asPath.split("/")[1]
    }/transactions?limit=10&start=${page * 10}`
  );

  if (!organization)
    return (
      <span className="loading loading-spinner text-primary loading-lg fixed top-1/2 left-1/2"></span>
    );

  return (
    <div className="flex flex-col h-[85vh]">
      <h1 className="big-text mb-6 mt-6">Recent transactions</h1>
      <div className="w-full p-2 bg-modal rounded-xl mb-2">
        <Table
          transactions={transactions?.transactions}
          organization={organization.id}
          limit={false}
        />
      </div>
      <div className="join mt-auto mx-auto">
        <button
          className="join-item btn"
          onClick={() => {
            if (page > 0) setPage(page - 1);
          }}
        >
          «
        </button>
        <button className="join-item btn">Page {page + 1}</button>
        <button
          className="join-item btn"
          onClick={() => {
            if (transactions?.total >= page*10) setPage(page + 1);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}

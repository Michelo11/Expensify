import { useFetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();

  const { data: organization } = useFetcher(
    `/api/organizations/${router.asPath.split("/")[1]}`
  );

  if (!organization)
    return (
      <span className="loading loading-spinner text-primary loading-lg fixed top-1/2 left-1/2"></span>
    );

  return <></>;
}

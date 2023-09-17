import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertSuccess } from "../components/Alert";

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
    <div>
      <AlertSuccess message={"Authenticated successfully"} active={active} />
      <h1 className="big-text">Financial record</h1>
    </div>
  );
}

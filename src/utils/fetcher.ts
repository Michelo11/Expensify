import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function useFetcher(url: string | undefined) {
  const data = useSWR(url, fetcher);
  return data;
}

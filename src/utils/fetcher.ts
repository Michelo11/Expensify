import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useFetcher = (url: string | undefined) => useSWR(url, fetcher);


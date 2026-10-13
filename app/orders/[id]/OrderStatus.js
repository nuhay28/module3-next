
"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

export default function OrderStatus({ initialData }) {
  const { data, error, isLoading } = useSWR(
    `/api/orders/${initialData.id}`,
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  if (error) return <p>Could not refresh order status.</p>;
  if (isLoading && !data) return <p>Loading order...</p>;

  return (
    <section>
      <h2>Status: {data.status}</h2>
      <p>Last updated: {new Date(data.updatedAt).toLocaleTimeString()}</p>
      <p>Status refreshes every five seconds.</p>
    </section>
  );
}

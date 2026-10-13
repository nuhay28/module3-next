
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/orders/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to load order");
  }

  const order = await response.json();

  return (
    <main>
      <h1>Order Status</h1>
      <p>Order ID: {id}</p>
      <OrderStatus initialData={order} />
    </main>
  );
}

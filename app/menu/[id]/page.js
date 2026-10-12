import Link from "next/link";
import { dishes } from "../../dishes";
import AddToCart from "../AddToCart";

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    return (
      <main>
        <h1>Dish not found</h1>
        <Link href="/menu">Back to Menu</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>

      <AddToCart dish={dish} />

      <p>
        <Link href="/menu">Back to Menu</Link>
      </p>
      <p>
        <Link href="/cart">View Cart</Link>
      </p>
    </main>
  );
}
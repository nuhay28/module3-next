import Link from "next/link";
import { dishes } from "../dishes";

export default function MenuPage() {
  return (
    <main>
      <h1>Addis Eats Menu</h1>
      <p>Choose your favorite Ethiopian dishes!</p>

      <div>
        {dishes.map((dish) => (
          <article key={dish.id}>
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p>Category: {dish.category}</p>
            <p>Price: {dish.price} ETB</p>

            <Link href={`/menu/${dish.id}`}>
              View Dish
            </Link>
            <hr />
          </article>
        ))}
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("addis-eats-cart") || "[]"
    );
    setCart(savedCart);
  }, []);

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id);

    localStorage.setItem(
      "addis-eats-cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <>
          <p>You haven't added an item to your cart yet.</p>
          <Link href="/menu">Browse Menu</Link>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <article key={item.id}>
              <h2>{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>
                Price: {item.price} ETB each
              </p>
              <p>
                Subtotal: {item.price * item.quantity} ETB
              </p>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
              <hr />
            </article>
          ))}

          <h2>Total: {total} ETB</h2>
          <Link href="/checkout">Proceed to Checkout</Link>
        </>
      )}
    </main>
  );
}
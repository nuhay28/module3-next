"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("addis-eats-cart") || "[]"
    );
    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
      setMessage("Your cart is empty. Please add a dish first.");
      return;
    }

    if (!/^[0-9+\-\s]{9,15}$/.test(phone.trim())) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    setMessage(
      `Thank you, ${name}! Your order for ${total} ETB has been received. Delivery area: ${area}.`
    );

    localStorage.removeItem("addis-eats-cart");
    setCart([]);
  }

  return (
    <main>
      <h1>Checkout</h1>

      {message ? (
        <>
          <p>{message}</p>
          <Link href="/menu">Return to Menu</Link>
        </>
      ) : (
        <>
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <p key={item.id}>
                  {item.name} × {item.quantity} —{" "}
                  {item.price * item.quantity} ETB
                </p>
              ))}
              <h3>Total: {total} ETB</h3>
            </>
          )}

          <form onSubmit={placeOrder}>
            <p>
              <label htmlFor="name">Full name</label>
              <br />
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </p>

            <p>
              <label htmlFor="phone">Phone number</label>
              <br />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </p>

            <p>
              <label htmlFor="area">Delivery area</label>
              <br />
              <input
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </p>

            <button type="submit">Place Order</button>
          </form>

          <p>
            <Link href="/cart">Back to Cart</Link>
          </p>
        </>
      )}
    </main>
  );
}
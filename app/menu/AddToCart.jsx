"use client";

export default function AddToCart({ dish }) {
  function addToCart() {
    const cart = JSON.parse(
      localStorage.getItem("addis-eats-cart") || "[]"
    );

    const existing = cart.find((item) => item.id === dish.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...dish, quantity: 1 });
    }

    localStorage.setItem("addis-eats-cart", JSON.stringify(cart));

    alert(`${dish.name} added to cart!`);
  }

  return (
    <button onClick={addToCart}>
      Add to Cart
    </button>
  );
}
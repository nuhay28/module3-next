import Link from "next/link";

export default function Home() {
  return(
    <main>
      <h1>Addis Eats</h1>
      <p>Welcome to Addis Eats</p>

      <nav>
        <Link href="/menu">Menu</Link>
        <br />
        <Link href="/cart">Cart</Link>
        <br />
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}
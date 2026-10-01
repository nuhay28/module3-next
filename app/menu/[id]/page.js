export default async function DishPage({ params }) {
  const { id } = await params;

  return (
    <main>
      <h1>Dish: {id}</h1>
      <p>Welcome to this dish page.</p>
    </main>
  );
}
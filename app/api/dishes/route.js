import { NextResponse } from "next/server";
import { dishes } from "../../dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = (searchParams.get("search") || "")
    .trim()
    .toLowerCase();

  const page = Math.max(
    1,
    Number.parseInt(searchParams.get("page") || "1", 10) || 1
  );

  const pageSize = 3;

  const filteredDishes = dishes.filter((dish) =>
    `${dish.name} ${dish.category} ${dish.description}`
      .toLowerCase()
      .includes(search)
  );

  const totalPages = Math.ceil(filteredDishes.length / pageSize);
  const start = (page - 1) * pageSize;

  return NextResponse.json({
    items: filteredDishes.slice(start, start + pageSize),
    page,
    pageSize,
    totalItems: filteredDishes.length,
    totalPages,
  });
}
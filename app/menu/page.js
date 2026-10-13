
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function MenuPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";
  const pageFromUrl = Number(searchParams.get("page") || "1");

  const [search, setSearch] = useState(searchFromUrl);
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    const nextUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  const query = new URLSearchParams({
    search: debouncedSearch,
    page: String(pageFromUrl),
  });

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/dishes?${query.toString()}`,
    fetcher,
    {
      keepPreviousData: true,
      refreshInterval: 0,
    }
  );

  function changePage(page) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <main>
      <h1>Addis Eats Menu</h1>
      <p>Choose your favorite Ethiopian dishes!</p>

      <label htmlFor="dish-search">Search dishes</label>
      <input
        id="dish-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by dish or category..."
      />

      {error && <p role="alert">Could not load dishes. Please try again.</p>}

      {isLoading && !data ? (
        <p>Loading dishes...</p>
      ) : (
        <>
          {isValidating && <p>Updating results...</p>}

          {data?.items?.length ? (
            data.items.map((dish) => (
              <article key={dish.id}>
                <h2>{dish.name}</h2>
                <p>{dish.description}</p>
                <p>Category: {dish.category}</p>
                <p>Price: {dish.price} ETB</p>
                <a href={`/menu/${dish.id}`}>View Dish</a>
                <hr />
              </article>
            ))
          ) : (
            <p>No dishes found.</p>
          )}

          <nav aria-label="Dish pages">
            <button
              type="button"
              disabled={pageFromUrl <= 1}
              onClick={() => changePage(pageFromUrl - 1)}
            >
              Previous
            </button>

            <span>
              Page {data?.page ?? pageFromUrl} of {data?.totalPages ?? 0}
            </span>

            <button
              type="button"
              disabled={
                !data ||
                pageFromUrl >= data.totalPages ||
                data.totalPages === 0
              }
              onClick={() => changePage(pageFromUrl + 1)}
            >
              Next
            </button>
          </nav>
        </>
      )}
    </main>
  );
}

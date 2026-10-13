# Addis Eats — Data Fetching Decisions

## 1. Menu Search and Pagination

**Endpoint:** `/api/dishes`

The menu API filters dishes by search term and returns a limited number of results per page.

### SWR Query Key

The query key is:

`/api/dishes?search=${debouncedSearch}&page=${pageFromUrl}`

- `search`: The debounced search term. It prevents a request from being triggered for every keystroke.
- `page`: The current page number, read from the URL query string.

Different search terms and page numbers produce different query keys, allowing SWR to cache results separately.

### Debounced Search

The search input waits 400 milliseconds after the user stops typing before updating the debounced search term. This reduces unnecessary requests.

When the search term is empty, the API receives an empty search parameter and returns all dishes across the available pages.

### Keeping Previous Data

`keepPreviousData: true` keeps the previous results visible while new search results load. This reduces flickering and provides a smoother experience.

### Freshness and Revalidation

SWR does not use a `staleTime` option like TanStack Query. Its freshness behavior is controlled by caching and revalidation settings.

The menu uses `refreshInterval: 0` because continuous polling is unnecessary for the dish list. SWR's default focus and reconnect revalidation behavior remains enabled.

## 2. Order Status Polling

**Endpoint:** `/api/orders/[id]`

The order page is a Server Component that fetches the initial order data and passes it to the client-side `OrderStatus` component.

### SWR Query Key

`/api/orders/${initialData.id}`

The order ID uniquely identifies the order being monitored. Different order IDs therefore use different SWR cache entries.

### Initial Server Data

The server fetches the order before rendering the page. The result is passed to SWR through `fallbackData`, allowing the initial status to appear without waiting for the first client-side request.

### Polling and Freshness

The order component uses:

- `refreshInterval: 5000` to revalidate the order status every five seconds.
- `revalidateOnFocus: false` to prevent an additional revalidation merely because the browser tab regains focus.
- `fallbackData: initialData` to provide the initial server-rendered order data.

The five-second polling interval balances timely status updates with a reasonable request frequency.

## 3. Pagination

The menu stores the current page in the URL query string, for example:

`/menu?page=2`

When the page changes, the query key changes and SWR fetches the corresponding results. Changing the search term resets pagination to page 1.

## 4. Error Handling

The menu displays an error message if the API request fails. The order component also displays an error message if a status refresh fails.

The API returns JSON responses containing the requested dish or order information.

## 5. Future Improvements

The current order API returns demonstration data with a fixed status. A production application would retrieve real order records from a database and update their status as the order progresses.
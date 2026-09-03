export async function fetchDishes(signal) {
  const response = await fetch("/dishes.json", { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch dishes: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
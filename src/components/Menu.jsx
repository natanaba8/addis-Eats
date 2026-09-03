import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMenu() {
      try {
        const response = await fetch("/dishes.json", { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch dishes: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setDishes(data);
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();

    return () => controller.abort();
  }, [category]);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const categoryDishes = category === "All"
    ? dishes
    : dishes.filter((dish) => dish.category === category);
  const visibleDishes = categoryDishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    document.title = `${visibleDishes.length} dishes`;
  }, [visibleDishes.length]);

  function addToOrder(price) {
    setTotal((previousTotal) => previousTotal + price);
  }

  function handleCategoryChange(nextCategory) {
    setLoading(true);
    setError(null);
    setCategory(nextCategory);
  }

  if (loading) {
    return (
      <main>
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search dishes"
          aria-label="Search dishes"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <p>Loading menu...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search dishes"
          aria-label="Search dishes"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <p role="alert">Error loading menu: {error}</p>
      </main>
    );
  }

  return (
    <main>
      <h2>Addis Eats - Our Menu</h2>
      <p className="order-total">Order total: {total} ETB</p>
      <input
        ref={searchInputRef}
        type="search"
        placeholder="Search dishes"
        aria-label="Search dishes"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <CategoryBar selected={category} onSelect={handleCategoryChange} />
      <DishList dishes={visibleDishes} onAdd={addToOrder} />
      <OrderForm />
    </main>
  );
}

export default Menu;
import { useEffect, useRef, useState } from "react";
import CategoryBar from "./components/CategoryBar";
import DishList from "./DishList";
import OrderForm from "./components/OrderForm";
import { fetchDishes } from "./api";

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
        const data = await fetchDishes(controller.signal);
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

  const searchInput = (
    <input
      ref={searchInputRef}
      type="search"
      placeholder="Search dishes"
      aria-label="Search dishes"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );

  if (loading) {
    return (
      <main>
        {searchInput}
        <CategoryBar selected={category} onSelect={handleCategoryChange} />
        <p>Loading menu...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        {searchInput}
        <CategoryBar selected={category} onSelect={handleCategoryChange} />
        <p role="alert">Error loading menu: {error}</p>
      </main>
    );
  }

  return (
    <main>
      {searchInput}
      <h2>Addis Eats - Our Menu</h2>
      <p className="order-total">Order total: {total} ETB</p>
      <CategoryBar selected={category} onSelect={handleCategoryChange} />
      <DishList dishes={visibleDishes} onAdd={addToOrder} />
      <OrderForm />
    </main>
  );
}

export default Menu;
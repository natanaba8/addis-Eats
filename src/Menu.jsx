import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryBar from "./components/CategoryBar";
import DishList from "./DishList";
import OrderForm from "./components/OrderForm";
import { useFetch } from "./hooks/useFetch";
import { useCart } from "./context/useCart";

function Menu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const { data: dishesData, loading, error } = useFetch("/dishes.json", category);
  const { total, dispatch } = useCart();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const visibleDishes = useMemo(() => {
    const dishes = dishesData || [];
    const categoryDishes = category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);
    return categoryDishes.filter((dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [category, dishesData, search]);

  useEffect(() => {
    document.title = `${visibleDishes.length} dishes`;
  }, [visibleDishes.length]);

  const addToOrder = useCallback((dish) => {
    dispatch({ type: "add", item: dish });
  }, [dispatch]);

  function handleCategoryChange(nextCategory) {
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
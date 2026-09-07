import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryBar from "./components/CategoryBar";
import DishList from "./DishList";
import { useFetch } from "./hooks/useFetch";
import { useCart } from "./context/useCart";
import { Link, useSearchParams } from "react-router-dom";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
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
    setSearchParams(nextCategory === "All" ? {} : { category: nextCategory });
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
      {visibleDishes.length > 0 && (
        <Link to={`/menu/${visibleDishes[0].id}`}>View the first dish</Link>
      )}
    </main>
  );
}

export default Menu;
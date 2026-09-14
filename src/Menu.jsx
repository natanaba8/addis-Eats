import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryBar from "./components/CategoryBar";
import DishList from "./DishList";
import { useFetch } from "./hooks/useFetch";
import { useCart, selectCartTotal } from "./context/useCart";
import { Link, useSearchParams } from "react-router-dom";
import Modal from "./ui/Modal";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [shouldCrashMenu, setShouldCrashMenu] = useState(false);
  const searchInputRef = useRef(null);
  const { data: dishesData, loading, error } = useFetch("/dishes.json", category);
  const total = useCart(selectCartTotal);
  const addItem = useCart((state) => state.addItem);

  if (shouldCrashMenu) {
    throw new Error("The menu intentionally crashed to prove the error boundary is isolating it.");
  }

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
    addItem(dish);
  }, [addItem]);

  const handleOpenDetails = useCallback((dish) => {
    setSelectedDish(dish);
  }, []);

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
      <button type="button" onClick={() => setShouldCrashMenu(true)}>
        Trigger menu failure
      </button>
      <CategoryBar selected={category} onSelect={handleCategoryChange} />
      <DishList dishes={visibleDishes} onAdd={addToOrder} onOpenDetails={handleOpenDetails} />
      {visibleDishes.length > 0 && (
        <Link to={`/menu/${visibleDishes[0].id}`}>View the first dish</Link>
      )}
      <Modal
        isOpen={Boolean(selectedDish)}
        onClose={() => setSelectedDish(null)}
        title={selectedDish?.name || "Dish details"}
      >
        {selectedDish && (
          <div>
            <p><strong>Price:</strong> {selectedDish.price} ETB</p>
            <p><strong>Category:</strong> {selectedDish.category}</p>
            <p><strong>Spicy:</strong> {selectedDish.isSpicy ? "Yes" : "No"}</p>
            <button type="button" onClick={() => addToOrder(selectedDish)}>
              Add to cart
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
}

export default Menu;
import { useEffect, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/menu.json");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        setDishes(data.items);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    }

    loadMenu();
  }, []);

  const filteredDishes = category === "All"
    ? dishes
    : dishes.filter((dish) => dish.category === category);

  function addToOrder(price) {
    setTotal((previousTotal) => previousTotal + price);
  }

  return (
    <main>
      <h2>Addis Eats - Our Menu</h2>
      <p className="order-total">Order total: {total} ETB</p>
      <CategoryBar selected={category} onSelect={setCategory} />
      {error ? <p role="alert">Error loading menu: {error}</p> : (
        <DishList dishes={filteredDishes} onAdd={addToOrder} />
      )}
      <OrderForm />
    </main>
  );
}

export default Menu;
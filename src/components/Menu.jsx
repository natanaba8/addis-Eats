import { useEffect, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/dishes.json");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        setDishes(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const filteredDishes = category === "All"
    ? dishes
    : dishes.filter((dish) => dish.category === category);

  useEffect(() => {
    document.title = `${filteredDishes.length} dishes`;
  }, [filteredDishes.length]);

  function addToOrder(price) {
    setTotal((previousTotal) => previousTotal + price);
  }

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p role="alert">Error loading menu: {error}</p>;
  }

  return (
    <main>
      <h2>Addis Eats - Our Menu</h2>
      <p className="order-total">Order total: {total} ETB</p>
      <CategoryBar selected={category} onSelect={setCategory} />
      <DishList dishes={filteredDishes} onAdd={addToOrder} />
      <OrderForm />
    </main>
  );
}

export default Menu;
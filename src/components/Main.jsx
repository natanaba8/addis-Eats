import React, { useEffect, useState } from "react";
import Dish from "./Dish";

function Main() {
   const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("All");
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await fetch("/menu.json");
        const response = await fetch(`menu.json?category=${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }

        const data = await response.json();
        setMenu(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      } finally{
        setLoading(false)
      }
    }

    fetchData();
  }, [category]);

  const mainCat = menu.filter(
    (item) => item.category === "Main course"
  );

  const sideCat = menu.filter(
    (item) => item.category === "Side Menu"
  );

  const beverage = menu.filter(
    (item) => item.category === "Beverage"
  );

  function addToOrder(price) {
    setTotal((previousTotal) => previousTotal + price);
  }

  return (
    <div>
      <h2>Addis Eats - Our Menu</h2>
      <h1>Total: {total} ETB</h1>
      <h2>All Menu</h2>
      <div className="card-container">
        { loading && <p>Loading Menu ...</p>}
        {error && <p>Error loading menu: {error.message}</p>}
        {!loading && !error &&
        menu.map((item) => (
          <Dish
            key={item.id}
            {...item}
            onAdd={() => addToOrder(item.price)}
          />
        ))}
      </div>

      <h2>Main Course</h2>
      <div className="card-container">
        {mainCat.map((item) => (
          <Dish
            key={item.id}
            {...item}
            onAdd={() => addToOrder(item.price)}
          />
        ))}
      </div>

      <h2>Side Menu</h2>
      <div className="card-container">
        {sideCat.map((item) => (
          <Dish
            key={item.id}
            {...item}
            onAdd={() => addToOrder(item.price)}
          />
        ))}
      </div>

      <h2>Beverages</h2>
      <div className="card-container">
        {beverage.map((item) => (
          <Dish
            key={item.id}
            {...item}
            onAdd={() => addToOrder(item.price)}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;

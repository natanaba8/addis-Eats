import { useCart } from "../context/useCart";
import "../css/style.css";

function Dish({ id, name, price, category, isSpicy, onAdd }) {
  const { items, dispatch } = useCart();
  const isInCart = items.some((item) => item.id === id);

  function handleAdd() {
    onAdd({ id, name, price, category, isSpicy });
  }

  return (
    <article className="dish-card">
      <h3>{name}</h3>
      <p>Price: {price} ETB</p>
      <p>Category: {category}</p>
      <p>{isSpicy ? "Spicy" : "Not spicy"}</p>

      {isInCart ? (
        <button onClick={() => dispatch({ type: "remove", id })}>
          Remove from cart
        </button>
      ) : (
        <button className="Add-Order" onClick={handleAdd}>
          Add to order
        </button>
      )}
    </article>
  );
}
export default Dish;

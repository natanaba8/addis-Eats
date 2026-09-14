import { useCart } from "../context/useCart";
import "../css/style.css";

function Dish({ id, name, price, category, isSpicy, onAdd, onOpenDetails }) {
  const items = useCart((state) => state.items);
  const remove = useCart((state) => state.remove);
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

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button type="button" onClick={() => onOpenDetails({ id, name, price, category, isSpicy })}>
          View details
        </button>

        {isInCart ? (
          <button type="button" onClick={() => remove(id)}>
            Remove from cart
          </button>
        ) : (
          <button type="button" className="Add-Order" onClick={handleAdd}>
            Add to order
          </button>
        )}
      </div>
    </article>
  );
}
export default Dish;

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../css/style.css";

function Dish({ id, name, price, category, isSpicy, onAdd }) {
  const { cart, dispatch } = useContext(CartContext);
  const isInCart = cart.some((item) => item.id === id);

  function handleAdd() {
    onAdd(price);
    dispatch({
      type: "Add",
      payload: { id, name, price, category, isSpicy },
    });
  }

  return (
    <article className="dish-card">
      <h3>{name}</h3>
      <p>Price: {price} ETB</p>
      <p>Category: {category}</p>
      <p>{isSpicy ? "Spicy" : "Not spicy"}</p>

      {isInCart ? (
        <button onClick={() => dispatch({ type: "Remove", payload: { id } })}>
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

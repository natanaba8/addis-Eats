import Dish from "./components/Dish";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="card-container">
      {dishes.map((dish) => (
        <Dish key={dish.id} {...dish} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default DishList;
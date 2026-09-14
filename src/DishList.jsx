import { memo } from "react";
import Dish from "./components/Dish";

function DishList({ dishes, onAdd, onOpenDetails }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="card-container">
      {dishes.map((dish) => (
        <Dish key={dish.id} {...dish} onAdd={onAdd} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
}

export default memo(DishList);
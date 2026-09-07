import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DishDetails() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <main><p>Loading dish...</p></main>;
  if (error) return <main><p role="alert">{error}</p></main>;

  const dish = dishes?.find((item) => String(item.id) === id);
  if (!dish) return <main><p role="alert">Dish not found.</p><Link to="/menu">Back to menu</Link></main>;

  return (
    <main>
      <h2>{dish.name}</h2>
      <p>{dish.price} ETB</p>
      <p>{dish.category}</p>
      <Link to="/menu">Back to menu</Link>
    </main>
  );
}

export default DishDetails;
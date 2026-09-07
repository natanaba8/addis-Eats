import { useCart } from "../context/useCart";
import { useTheme } from "../context/useTheme";
import { useFetch } from "../hooks/useFetch";
import "../css/style.css";

function Header(){

    const { items, dispatch } = useCart();
    const { theme, toggleTheme } = useTheme();
    const { data: serverDishesData } = useFetch("/dishes.json");
    const serverDishes = serverDishesData || [];

    return <header>
        <h1>My First React app</h1>
        <h2>Cart Item : {items.length}</h2>
        <p>{serverDishes.length} dishes available</p>
        <button onClick={toggleTheme}>Use {theme === "light" ? "dark" : "light"} theme</button>
        <button onClick={() => dispatch({ type: "clear" })} disabled={!items.length}>Clear cart</button>

    </header>
}
export default Header;
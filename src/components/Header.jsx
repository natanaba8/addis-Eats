import { useState } from "react";
import { useCart } from "../context/useCart";
import { useTheme } from "../context/useTheme";
import { useFetch } from "../hooks/useFetch";
import { NavLink } from "react-router-dom";
import "../css/style.css";

function Header(){
    const [shouldCrashCart, setShouldCrashCart] = useState(false);
    const itemsCount = useCart((state) => state.items.length);
    const clearCart = useCart((state) => state.clear);
    const { theme, toggleTheme } = useTheme();
    const { data: serverDishesData } = useFetch("/dishes.json");
    const serverDishes = serverDishesData || [];

    if (shouldCrashCart) {
      throw new Error("The cart intentionally crashed to prove the error boundary is isolating it.");
    }

    return <header>
        <h1>My First React app</h1>
        <nav aria-label="Main navigation">
            <NavLink to="/menu" className={({ isActive }) => isActive ? "active" : ""}>Menu</NavLink>
            <NavLink to="/checkout" className={({ isActive }) => isActive ? "active" : ""}>Checkout</NavLink>
        </nav>
        <h2>Cart Item : {itemsCount}</h2>
        <p>{serverDishes.length} dishes available</p>
        <button onClick={toggleTheme}>Use {theme === "light" ? "dark" : "light"} theme</button>
        <button onClick={clearCart} disabled={!itemsCount}>Clear cart</button>
        <button type="button" onClick={() => setShouldCrashCart(true)}>Trigger cart failure</button>
    </header>
}
export default Header;
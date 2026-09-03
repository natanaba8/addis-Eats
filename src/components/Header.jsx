import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../css/style.css";

function Header(){

    const {cart} = useContext(CartContext);

    return <header>
        <h1>My First React app</h1>
        <h2>Cart Item : {cart.length}</h2>

    </header>
}
export default Header;
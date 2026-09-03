import Card from "./Card";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Footer(){
    const {cart} = useContext(CartContext);
    return <div className="footer">
       <h2 >Natan Abera</h2>
       {cart.map((item)=>(
        <Card key={item.id}>
            </Card>
       ))}
       {/* <Card>
           <p>Contact: ABC</p>
           <p> phone : 123-456</p>
       </Card>
       <Card>
        <h6>Address: xyz</h6>
       </Card> */}
    </div>
}
export default Footer;
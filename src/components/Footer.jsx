import Card from "./Card";
import { useCart } from "../context/useCart";

function Footer(){
    const {items} = useCart();
    return <div className="footer">
       <h2 >Natan Abera</h2>
    {items.map((item)=>(
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
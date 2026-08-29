import { useEffect } from "react";
import "../css/style.css"

function Header(){

    // useEffect(useEffect, effectcall ? : effectcall)

    useEffect(() => {
        // console.log("Header Component");
        async function fetchData() {
            try{
                const response = await fetch("https://api.example.com");
                const data = await response.json();
            } catch(error){
                console.log("Error fetching data:", error)
            }
            
        }

        fetchData()
    }, [])
    return <div>
        <h1>My First React app</h1>
    </div>
}
export default Header;
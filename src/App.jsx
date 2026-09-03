import { useReducer } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './Menu';
import { CartContext } from './context/CartContext';
import "./css/style.css";

// const user ={
//   name: "Natan",
//   email: "natan@gmail.com",
// };

function cartReducer(state, action,)  {
  switch(action.type){
    case "Add":
      return[...state, action.payload];
      case "Remove":
        return state.filter((item) => item.id !== action.payload.id)
        default:
          return state;
  }
}

function App() {

  const [cart, dispatch] = useReducer(cartReducer, []) ;

  return (
    <div>
      <CartContext.Provider value={{cart,dispatch}}>
      <Header/>
      <Menu/>
      <Footer/>
      </CartContext.Provider>
    </div>
  );
}

export default App

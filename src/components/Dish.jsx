import React from 'react'
import { useState } from 'react';
// import PropTypes from 'prop-types'
import Card from './Card'
import "../css/style.css"

function Dish({name, price, category, isSpicy, currency="ETB", onAdd}) {
  // let count =0;
  // function add(){
  //   count = count+1;
  //   console.log(count);
  // }

  // const [count, setCount] = useState(0);

  // function add(){
  //   setCount(count + 1);
  // }

  return (
    <div>
      <h3>{name}</h3>
      <p>Price: {price} ETB</p>
      <p>Category: {category}</p>
      <p>{isSpicy ? "Spicy" : "Not spicy"}</p>

      <button className='Add-Order' onClick={onAdd}>Add to order</button>
    </div>
  )
}

// Dish.propTypes = {
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   isSpicy: PropTypes.bool, // optional
//   category: PropTypes.string.isRequired,
// };
export default Dish

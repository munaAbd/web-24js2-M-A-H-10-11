import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart = [], setCart }) {  

  const navigate = useNavigate();
  
  
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };


  const handleCheckout = () => {
    alert('Tack för att du handlade hos oss!');
    setCart([]); 
    navigate('/'); 
  };

  return (
    <div>
      <h2>Kassa</h2>
      <p>Här kan du slutföra ditt köp.</p>

      {cart.length > 0 ? (
        <div>
          <h3>Produkter i varukorgen:</h3>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <h4>{product.name} - {product.price} kr</h4>
                <p>Antal: 1</p> {}
              </li>
            ))}
          </ul>

          <h3>Totalpris: {calculateTotal()} kr</h3>
          <button onClick={handleCheckout}>Slutför köp</button>
        </div>
      ) : (
        <p>Din varukorg är tom.</p>
      )}
    </div>
  );
}

export default Cart;

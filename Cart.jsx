import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, update } from 'firebase/database'; 
import { db } from '../firebase'; 

function Cart({ cart = [], setCart }) {  
  const navigate = useNavigate();

  const calculateTotal = useMemo(() => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    alert('Tack för att du handlade hos oss!');
    setCart([]); 
    navigate('/'); 
  };

  const handleClearCart = async () => {
    if (window.confirm('Är du säker på att du vill tömma kundvagnen?')) {
      try {
        const updates = cart.map(async (product) => {
          const productRef = ref(db, `products/${product.id}`);
          const updatedInventory = product.originalInventory;

          // Återställ till original inventory från produktens data
          await update(productRef, { inventory: updatedInventory });
          console.log(`Lagersaldo för ${product.name} återställt till ${updatedInventory}.`);
        });

        await Promise.all(updates); // Vänta på alla uppdateringar i Firebase
        setCart([]); // Töm kundvagnen lokalt
      } catch (error) {
        console.error('Fel vid återställning av lagersaldo:', error);
        alert('Kunde inte tömma kundvagnen på grund av ett fel.');
      }
    }
  };

  return (
    <div>
      <h2>Varukorg</h2>
      {cart.length > 0 ? (
        <div>
          <h3>Produkter i varukorgen:</h3>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <h4>{product.name} - {product.price} kr</h4>
                <p>Antal: {product.quantity}</p>
              </li>
            ))}
          </ul>

          <h3>Totalpris: {calculateTotal} kr</h3>
          <button onClick={handleCheckout}>Slutför köp</button>
          <button onClick={handleClearCart}>Töm kundvagnen</button>
        </div>
      ) : (
        <p>Din varukorg är tom.</p>
      )}
    </div>
  );
}

export default Cart;

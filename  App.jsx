import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/Product';  // Justera importen för din produktlista
import Cart from './components/Cart';
import { ref, update } from 'firebase/database';  // Import för Firebase
import { db } from './firebase';  // Importera databasen

function App() {
  const [cart, setCart] = useState([]);

  // Funktion för att lägga till en produkt i varukorgen
  const addToCart = (product) => {
    if (product.inventory <= 0) {
      alert(`${product.name} är slut i lager!`);
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(p => p.id === product.id);

      if (existingProduct) {
        console.log(`Ökar kvantiteten för ${product.name}`);
        return prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        console.log(`Lägger till ${product.name} i varukorgen`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Uppdatera lagersaldo i Firebase
    const productRef = ref(db, `products/${product.id}`);
    const updatedInventory = product.inventory - 1;

    update(productRef, { inventory: updatedInventory })
      .then(() => {
        console.log(`${product.name} lagersaldo uppdaterat till ${updatedInventory}.`);
      })
      .catch((error) => {
        console.error('Fel vid uppdatering av lagersaldo:', error);
        alert('Det uppstod ett problem med att uppdatera lagersaldot.');

        // Ångra förändringar i kundvagnen om Firebase-uppdateringen misslyckas
        setCart((prevCart) => prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        ));
      });
  };

  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  
import { ref, onValue, update } from 'firebase/database';  

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(db, 'products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const productData = snapshot.val();
        setProducts(Object.entries(productData).map(([id, value]) => ({ id, ...value })));
        setLoading(false);
      } else {
        console.log('Inga produkter hittades.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = async (product) => {
    if (product.inventory > 0) {
      const newInventory = product.inventory - 1;
      const productRef = ref(db, `products/${product.id}`);

      try {
        await update(productRef, { inventory: newInventory });

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, inventory: newInventory } : p
          )
        );

        addToCart({ ...product, quantity: 1, originalInventory: product.inventory });
      } catch (error) {
        console.error('Fel vid uppdatering av lagersaldo:', error);
        alert('Kunde inte lägga till produkt i varukorgen.');
      }
    } else {
      alert('Produkten är slut i lager!');
    }
  };

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name} - {product.price} kr</h2>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '150px', height: 'auto' }} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Fallback om bilden inte laddas
              />
              <p>Lagersaldo: {product.inventory > 0 ? product.inventory : 'Slut i lager'}</p>
              <button 
                onClick={() => handleAddToCart(product)} 
                disabled={product.inventory === 0}
              >
                Köp nu
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga produkter tillgängliga just nu.</p>
      )}
    </div>
  );
}

export default Product;

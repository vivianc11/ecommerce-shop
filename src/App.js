import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar } from './components';

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data); // Setting the received data as products
  }

  // making the cart dynamic and seeing what's in the cart
  const fetchCart = async () => {
    // getting the cart and setting it to the state
    setCart(await commerce.cart.retrieve());
  }
  
  // adding items to the cart
  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity)); // this is the cart after the item as been added
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  console.log(cart);

  return (
    <div>
        <Navbar totalItems={cart.total_items}/>
        <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  )
}

export default App;
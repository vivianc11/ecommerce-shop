import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    // Setting the received data as products
    setProducts(data); 
  }

  // making the cart dynamic and seeing what's in the cart
  const fetchCart = async () => {
    // getting the cart and setting it to the state
    setCart(await commerce.cart.retrieve());
  }
  
  // adding items to the cart
  const handleAddToCart = async (productId, quantity) => {
    // this is the cart after the item as been added
    setCart(await commerce.cart.add(productId, quantity)); 
  }

  // updating cart quantitiy
  const handleUpdateCartQty = async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, { quantity }));
  }

  // removing items from cart
  const handleRemoveFromCart = async (productId) => {
    setCart(await commerce.cart.remove(productId));
  }

  // emptying entire cart
  const handleEmptyCart = async () => {
    setCart(await commerce.cart.empty());
  }

  // refreshing the cart upon completing an order 
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      // getting meaningful message on why the error occurred
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  // console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>

          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path='/cart'>
            <Cart 
              cart={cart} 
              handleEmptyCart={handleEmptyCart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Route>

          <Route exact path='/checkout'>
            <Checkout 
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>

        </Switch>
      </div>
    </Router>
    
  )
}

export default App;
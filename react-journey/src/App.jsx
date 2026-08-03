import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import PracticePage from "./pages/PracticePage";
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
      return JSON.parse(savedCart)
    }
    return [];
  });
  function increaseCartQty(productId) {
    setCartItems(prevCart => {
     return prevCart.map(item => {
        if(item.id !== productId) return item;
        return {...item, quantity: item.quantity + 1}
      })
    })
  }
  function decreaseCartQty(productId) {
    setCartItems(prevCart => {
      const item = prevCart.find(item => item.id === productId);

      if(item.quantity === 1) {
        return prevCart.filter(item => item.id !== productId);
      };
      
      return prevCart.map(item => {
        if(item.id !== productId) return item;
        return {...item, quantity: item.quantity - 1 }
      })
    })
  }
  function removeFromCart(productId) {
    setCartItems(prevCart => prevCart.filter(item => item.id !== productId))
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="products/:id" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} increaseQty={increaseCartQty} decreaseQty={decreaseCartQty} removeFromCart={removeFromCart} />} />
      </Routes>
    </>
  );
}

export default App;

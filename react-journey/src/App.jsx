import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import PracticePage from "./pages/PracticePage";
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";
import useCart from "./hooks/useCart";
import ReducerDemo from "./pages/ReducerDemo";
import Drawer from "./components/ui/Drawer";
import CartDrawer from "./components/cart/CartDrawer";

function App() {

  const {
    cartItems,
    addToCart,
    increaseCartQty,
    decreaseCartQty,
    removeFromCart,
  } = useCart();

  return (
    <>
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reducer-demo" element={<ReducerDemo />} />
      </Routes>
    </>
  );
}

export default App;

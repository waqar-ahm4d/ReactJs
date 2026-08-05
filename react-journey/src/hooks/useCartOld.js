import { useEffect, useState } from "react";

function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) return JSON.parse(savedCart);

    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, quantity) {
    console.log('atc ');
    
    setCartItems((prevCart) => {
      let found = false;
      const updatedCart = prevCart.map((item) => {
        if (item.id !== product.id) return item;
        found = true;
        return { ...item, quantity: item.quantity + quantity };
      });
      if (!found) {
        return [...updatedCart, { ...product, quantity }];
      }
      return updatedCart;
    });
    // setCartItems((prevCart) => {
    //   const existingItem = prevCart.find((item) => item.id === product.id);
    //   if (!existingItem) {
    //     return [...prevCart, { ...product, quantity }];
    //   }
    //   return prevCart.map((item) => {
    //     if (item.id === product.id) {
    //       return { ...item, quantity: item.quantity + quantity };
    //     }
    //     return item;
    //   });
    // });
  }

  function increaseCartQty(productId) {
    setCartItems((prevCart) => {
      return prevCart.map((item) => {
        if (item.id !== productId) return item;
        return { ...item, quantity: item.quantity + 1 };
      });
    });
  }

  function decreaseCartQty(productId) {
    setCartItems((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      if (item.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) => {
        if (item.id !== productId) return item;
        return { ...item, quantity: item.quantity - 1 };
      });
    });
  }
  function removeFromCart(productId) {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId),
    );
  }

  return {
    cartItems,
    addToCart,
    increaseCartQty,
    decreaseCartQty,
    removeFromCart,
  };
}
export default useCart;

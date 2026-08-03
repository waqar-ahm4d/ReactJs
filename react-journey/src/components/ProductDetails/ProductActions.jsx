function ProductActions({ product, quantity, cartItems, setCartItems }) {
  function addToCart() {
    // setCartItems((previousCart) => {
    //   const existingItem = previousCart.find((item) => item.id === product.id);

    //   if (!existingItem) {
    //     return [...previousCart, { ...product, quantity }];
    //   }
    //   return previousCart.map((item) => {
    //     if (item.id === product.id) {
    //       return {
    //         ...item,
    //         quantity: item.quantity + quantity,
    //       };
    //     }
    //     return item;
    //   });
    // });

    setCartItems((prevCart) => {
      let found = false;
      const updatedCart = prevCart.map((item) => {
        if (item.id !== product.id) return item;
        found = true;
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      });
      if (!found) {
        // updatedCart.push({
        //     ...product,
        //     quantity
        // });
        return [ ...updatedCart, {...product, quantity}, ];
      }
      return updatedCart;
    });
  }

  console.log(cartItems);

  return (
    <>
      <div className="product-actions">
        <button onClick={addToCart}>Add to cart</button>
        <button>Buy Now</button>
      </div>
    </>
  );
}
export default ProductActions;

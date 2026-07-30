import { useState } from "react";
import ProductCard from "./ProductCard";


const products = [
  {
    id: 1,
    title: "iPhone 17",
    price: 999,
    category: "Mobile",
  },
  {
    id: 2,
    title: "MacBook Pro",
    price: 1999,
    category: "Laptop",
  },
  {
    id: 3,
    title: "AirPods Pro",
    price: 249,
    category: "Accessories",
  },
];

function App() {
  const [count, setCount] = useState(0);

  function increment(value) {
    // setCount(count + value);
    setCount(prev => prev + value);
  }
  function decrement() {
    setCount(prev => prev - 1);
  }
  function reset() {
    setCount(0);
  }

  

  return (
    <>
      <h1>{count}</h1>
      <div>
        <button onClick={() => decrement()}> - </button>
        <button onClick={() => increment(1)}> +1 </button>
        <button onClick={() => increment(5)}> +5</button>
        <button onClick={() => increment(10)}> +10</button>
        <button onClick={reset}> Reset </button>
      </div>

      <div>
        {
          products.map(product => (
            <ProductCard key={product.id} title={product.title} price={product.price} category={product.category} />
          ))
        }
      </div>

    </>
  );
}

export default App;

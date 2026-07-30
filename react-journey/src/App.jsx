import { useState } from "react";
import ProductCard from "./ProductCard";
import { useEffect } from "react";


const products = [
  {
    id: 1,
    title: "iPhone 17",
    price: 999,
    comparePrice: 1499,
    category: "Mobile",
    stock: 90,
    
  },
  {
    id: 2,
    title: "MacBook Pro",
    price: 1799,
    comparePrice: 2999,
    category: "Laptop",
    stock: 10,
    
  },
  {
    id: 3,
    title: "AirPods Pro",
    price: 249,
    category: "Accessories",
    stock: 10,
      
  },
  {
    id: 4,
    title: "MacBook Pro",
    price: 1999,
    comparePrice: 2999,
    category: "Laptop",
    stock: 10,
    
  },
  {
    id: 5,
    title: "AirPods Pro",
    price: 349,
    category: "Accessories",
    stock: 10,
      
  },
];

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log('tick 2');
    }, 100);
    console.log('Mounted');
    return () => {
      console.log('Cleanup - Counter Stopped');
      clearInterval(id);
    }
  }, [])
  return <h2>Timer Running</h2>
}

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

  // useEffect(() => {
  //   console.log("New Count: ", count);
  //   return () => {
  //     console.log("Old Count: ", count);
  //   }
  // }, [count]);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log('tick')
  //   }, 100)

  //   return () => {
  //     clearInterval(id)
  //   };
  // }, []) //tick keep on running because [] never changes or unmounnted....

  const [show, setShow] = useState(true);

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
      <br />
      <div className="products-wrapper" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'center'}}>
        {
          products.map(product => (
            <ProductCard key={product.id} title={product.title} price={product.price} comparePrice={product.comparePrice} category={product.category} inStock={product.stock} />
          ))
        }
      </div>
      <br />
      {show && <Timer />}
      <button onClick={() => setShow(!show)}>Toggle Timer</button>
      <br /><br />
    </>
  );
}

export default App;

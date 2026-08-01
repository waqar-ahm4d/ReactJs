import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import PracticePage from "./pages/PracticePage";
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </>
  );
}

export default App;

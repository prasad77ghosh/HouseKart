import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import ProductDetails from "./Components/ProductComponents/ProductDetails";
import Products from "./Pages/Products";
function App() {
  return (
    <div className="main-body">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="products" element={<Products />} />
          <Route path="products/product/:id" element={<ProductDetails />} />
          <Route path="products/:keyword" element={<Products />} />
          <Route path="products/:keyword/product/:id" element={<ProductDetails />} />
          <Route path="products/:price" element={<Products />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

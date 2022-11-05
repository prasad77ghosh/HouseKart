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
          <Route path="products" element={<Products />}/>
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="products/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

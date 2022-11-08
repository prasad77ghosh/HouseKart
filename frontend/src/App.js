import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import ProductDetails from "./Components/ProductComponents/ProductDetails";
import Products from "./Pages/Products";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import store from "./store";
import { useEffect } from "react";
import { userInfo } from "./Actions/Auth";
import UserInfo from "./Components/UserComps/UserInfo";
import ProtrctedRoute from "./ProtectedRoutes/ProtectedRoute";
import UpdateProfile from "./Components/UserComps/UpdateProfile";
import UpdatePassword from "./Components/UserComps/UpdatePassword";
function App() {
  useEffect(() => {
    store.dispatch(userInfo());
  }, []);

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
          <Route
            path="products/:keyword/product/:id"
            element={<ProductDetails />}
          />
          <Route path="products/:price" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtrctedRoute />}>
            <Route path="account" element={<UserInfo />} />
            <Route path="me/update" element={<UpdateProfile />} />
            <Route path="password/update" element={<UpdatePassword />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

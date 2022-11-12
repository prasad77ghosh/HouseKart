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
import ForgotPassword from "./Components/UserComps/ForgotPassword";
import ResetPassword from "./Components/UserComps/ResetPassword";
import ShippingInfo from "./Components/ProductComponents/ShippingInfo";
import ConfirmOrder from "./Components/ProductComponents/ConfirmOrder";
import Cart from "./Pages/Cart";
import http from "./http";
import { useState } from "react";
import Payment from "./Components/ProductComponents/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await http.get("/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(userInfo());
    getStripeApiKey();
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
          <Route path="password/forgot" element={<ForgotPassword />} />
          <Route path="password/reset/:token" element={<ResetPassword />} />
          <Route path="cart" element={<Cart />} />
          <Route element={<ProtrctedRoute />}>
            <Route path="account" element={<UserInfo />} />
            <Route path="me/update" element={<UpdateProfile />} />
            <Route path="password/update" element={<UpdatePassword />} />
            <Route path="shipping" element={<ShippingInfo />} />
            <Route path="order/confirm" element={<ConfirmOrder />} />
            <Route
              path="process/payment"
              element={
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                )
              }
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

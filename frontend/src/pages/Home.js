import React, { useEffect } from "react";
import "./home.css";
import hero from "../images/Hero.png";
import { HiArrowNarrowDown } from "react-icons/hi";
import Product from "../components/product/Product";
import MetaData from "../components/metaData";
import { allProducts } from "../Slice/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../status";
import Loader from "../components/loader/Loader";
import Err from "../components/error/Err";

const Home = () => {
  const dispatch = useDispatch();
  const { status, products, productCount } = useSelector(
    (state) => state.allProduct
  );

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  if (status === STATUSES.LOADING) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <>
        <div className="error-cont">
          <Err />
        </div>
      </>
    );
  }

  return (
    <>
      <MetaData title="HouseKart" />
      <div className="main-home">
        <div className="main-hero">
          <div className="left-sec">
            <h2 className="wel-text">Welcome To HouseKart</h2>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#product-cont">
              <button className="scroll-btn">
                <span>Scroll</span>
                <HiArrowNarrowDown size={18} />
              </button>
            </a>
          </div>
          <div className="right-sec">
            <img src={hero} alt="hero img" />
          </div>
        </div>

        <h2 className="homeHeading">Featured Products</h2>
        <div className="products" id="product-cont">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "white",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <div className="info-sec">
          <h2 className="p-name">{product.name.toLowerCase()}</h2>
          <div className="p-rating">
            <ReactStars {...options} />
            <span>{`(${product.numOfReviews}  Reviews)`}</span>
          </div>
          <p className="p-price">{`Price = ₹${product.price}`}</p>
        </div>
      </Link>
    </>
  );
};

export default Product;

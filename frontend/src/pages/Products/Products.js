import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import Product from "../../components/product/Product";
import { allProducts } from "../../Slice/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../status";
import Loader from "../../components/loader/Loader";
import Err from "../../components/error/Err";

const Products = () => {
  const dispatch = useDispatch();
  const { status, products, productCount } = useSelector(
    // reducer
    (state) => state.allProduct
  );

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(allProducts(keyword));
  }, [dispatch, keyword]);

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
      <div className="products-page">
        <h2 className="main-heading">Products</h2>
        <div className="main-products-sec">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;

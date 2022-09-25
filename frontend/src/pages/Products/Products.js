import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import Product from "../../components/product/Product";
import { allProducts } from "../../Slice/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../status";
import Loader from "../../components/loader/Loader";
import Err from "../../components/error/Err";
import Pagination from "react-js-pagination";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword, page } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { status, products, productCount, resultPerPage } = useSelector(
    (state) => state.allProduct
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  
  useEffect(() => {
    // console.log(typeof currentPage);
    dispatch(allProducts({ keyword, currentPage }));
    // console.log(currentPage);
    // console.log(keyword);
  }, [dispatch, keyword, currentPage]);

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

        {resultPerPage < productCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Products;

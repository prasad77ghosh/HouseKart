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
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { FiChevronRight } from "react-icons/fi";

const Categories = [
  "Laptop",
  "Mobile",
  "Camera",
  "Gadget",
  "Men's Wear",
  "Women's Wear",
  "Men's Footwear",
  "Women's Footwear",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [Category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const handlePrice = (e, newPrice) => {
    setPrice(newPrice);
  };

  const { status, products, productCount, resultPerPage } = useSelector(
    (state) => state.allProduct
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(allProducts({ keyword, currentPage, price, Category, ratings }));
  }, [dispatch, keyword, currentPage, price, Category, ratings]);

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
      <button
        className="showFilterBtn"
        onClick={() => setShowFilter(!showFilter)}
      >
        Filters
        <FiChevronRight size={20} />
      </button>
      <div className="products-page">
        <h2 className="main-heading">Products</h2>
        <div className="main-products-sec">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>

        {showFilter && (
          <div className="filterBox">
            <div className="price-filter-cont">
              <p>Filter by Price</p>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={price}
                onChange={handlePrice}
                valueLabelDisplay="on"
                min={0}
                max={200000}
                step={1000}
                disableSwap
                className="slider"
              />
            </div>
            <div className="category-filter-cont">
              <p>Filter By Category</p>
              {Categories.map((category) => (
                <li
                  className="category-box"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </div>

            <div className="rating-filter-cont">
              <p>Filter By Ratings Above</p>
              <Slider
                aria-label="Temperature"
                valueLabelDisplay="on"
                min={0}
                max={5}
                step={1}
                className="slider"
                onChange={(e, newRatings) => {
                  setRatings(newRatings);
                }}
              />
            </div>
          </div>
        )}

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

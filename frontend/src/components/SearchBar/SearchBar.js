import React, { useState, useEffect } from "react";
import "./searchBar.css";
import { useNavigate, Link } from "react-router-dom";
import { allProducts } from "../../Slice/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../status";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector(
    //reducer
    (state) => state.allProduct
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  //debounce function
  function Debounce(func, delay) {
    let timeOutId;
    return function (...args) {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    };
  }

  const handleFilter = (e) => {
    e.preventDefault();
    const wordEntered = e.target.value;
    const newFillter = products.filter((product) => {
      return product.name.toLowerCase().includes(wordEntered.toLowerCase());
    });

    if (wordEntered === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFillter);
    }
    setKeyword(wordEntered);
  };

  const decoretedFindSuggestion = Debounce(handleFilter, 300);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
    setFilteredData([]);
    setKeyword("");
  };

  return (
    <>
      <div className="searchBox">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Serach products..."
            onChange={decoretedFindSuggestion}
          />
          <input type="submit" value="Search" onClick={searchSubmitHandler} />
        </div>
        {filteredData.length !== 0 && (
          <div className="searchSuggetions">
            {filteredData.slice(0, 15).map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <p>{product.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;

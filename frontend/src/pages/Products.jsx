import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropsBar from "../Components/ExtraComponents/PropsBar";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../Actions/Products";
import Product from "../Components/ProductComponents/Product";
import Loader from "../Components/ProductComponents/Loader";
import Pagination from "react-js-pagination";
import { useState } from "react";
const Products = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const { keyword } = useParams();

  const { loading, data, error } = useSelector(
    (state) => state.ProductsReducer
  );
  const { products, resultPerPage, productCount } = data;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // let count = filteredProductCount;

  //API call
  useEffect(() => {
    dispatch(allProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  //Error handling
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch({
        type: "clearError",
      });
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <Box width="80%" margin="0 auto" minH="100vh" maxW="90%">
        <PropsBar
          price={price}
          setPrice={setPrice}
          category={category}
          setCategory={setCategory}
          ratings={ratings}
          setRatings={setRatings}
        />
        <Box
          textAlign="center"
          borderBottom="2px solid tomato"
          width={{ base: "60%", md: "20%" }}
          margin="0 auto"
          mt={4}
        >
          <Text fontSize="xl" fontWeight="bold">
            PRODUCTS
          </Text>
        </Box>

        <Box mb={10}>
          {loading ? (
            <>
              <Box
                display="flex"
                flexWrap="wrap"
                mt={5}
                mb={4}
                justifyContent="space-between"
              >
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
              </Box>
            </>
          ) : (
            <>
              <Box
                display="flex"
                flexWrap="wrap"
                mt={5}
                mb={4}
                justifyContent="space-between"
              >
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </Box>
            </>
          )}
        </Box>

        {resultPerPage < productCount && (
          <Box mb={5}>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText=">>"
              prevPageText="<<"
              firstPageText="1st"
              lastPageText="last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Products;

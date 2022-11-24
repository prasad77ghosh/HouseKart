import { Box, Text, useToast } from "@chakra-ui/react";
import React from "react";
import Typewriter from "typewriter-effect";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allProducts } from "../Actions/Products";
import Product from "../Components/ProductComponents/Product";
import Loader from "../Components/ProductComponents/Loader";
import MetaData from "../MetaData";
const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, data, error } = useSelector(
    (state) => state.ProductsReducer
  );
  const { products } = data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

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
    <MetaData title="HOUSE-KART-(HOME)"/>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="purple.900"
        minH="100vh"
      >
        <Box
          mb={{ base: "40%", md: "10%" }}
          textAlign="center"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            fontSize="6xl"
            fontWeight="medium"
            color="tomato"
            letterSpacing="1px"
            display={{ base: "none", md: "block" }}
          >
            <Typewriter
              options={{
                strings: ["WELCOME TO HOUSEKART"],
                autoStart: true,
                loop: true,
                delay: 100,
              }}
            />
          </Box>
          <Text
            fontSize="4xl"
            fontWeight="medium"
            color="gray.100"
            letterSpacing="1px"
            display={{ base: "block", md: "none" }}
          >
            WELCOME TO
          </Text>
          <Text
            fontSize="3xl"
            fontWeight="medium"
            color="gray.100"
            letterSpacing="1px"
            display={{ base: "block", md: "none" }}
          >
            HOUSEKART
          </Text>
          <Text
            color="gray.100"
            fontSize={{ base: "xl", md: "3xl" }}
            mt={{ base: "50px", md: "0" }}
          >
            Find Aamazing Product Below
          </Text>

          <Box
            color="gray.300"
            display="flex"
            alignItems="center"
            gap={2}
            borderColor="gray.300"
            px={2}
            py={1}
            borderRadius="10px"
            cursor="pointer"
            width="fit-content"
            justifyContent="center"
            mt={{ base: "30px", md: "60px" }}
            bg="purple.800"
            _hover={{
              bg: "purple.900",
              borderWidth: "1px",
              transition: "all 0.50s ease",
            }}
          >
            <Box mt={1} display={{ base: "none", md: "block" }}>
              <BsChevronDown size="25" />
            </Box>
            <Box mt={1} display={{ base: "block", md: "none" }}>
              <BsChevronDown size="15" />
            </Box>
            <Box>
              <Text fontSize={{ base: "17px", md: "23" }} p={1}>
                Scroll Down
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width="80%" margin="0 auto" mb={5} mt={5}>
        <Box
          textAlign="center"
          borderBottom="2px solid tomato"
          width={{ base: "100%", md: "30%" }}
          margin="0 auto"
        >
          <Text fontSize="2xl" fontWeight="medium">
            FEATURED PRODUCTS
          </Text>
        </Box>
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
    </>
  );
};

export default Home;

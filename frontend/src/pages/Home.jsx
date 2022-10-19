import {
  Box,
  Container,
  Image,
  Text,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Hero from "../img/Hero.png";
import { FiArrowDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Slices/getAllProductSlice";
import { reset } from "../Slices/getAllProductSlice";
import Product from "../components/Product";

const Home = () => {
  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.allProducts
  );
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    dispatch(reset());
  }, [dispatch, isError, toast, message]);

  if (isLoading) {
    return (
      <Box
        p={4}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="red.500" />
      </Box>
    );
  }

  return (
    <Box width="100%">
      <Box
        width="100%"
        height={{ base: "20rem", md: "25rem", lg: "3xl" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.600"
      >
        <Box
          width={{ base: "100%", md: "50%", lg: "50%" }}
          px={{ base: 3, md: "0", lg: "0" }}
          textAlign="center"
          mb="1rem"
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}
          >
            Welcome To HouseKart
          </Text>
          <Text
            fontWeight="medium"
            fontSize={{ base: "20px", md: "15px", lg: "40px" }}
          >
            FIND AMAZING PRODUCTS BELOW
          </Text>
          <Button
            rightIcon={<FiArrowDown />}
            colorScheme="teal"
            variant="outline"
            mt="2rem"
          >
            Scroll Down
          </Button>
        </Box>
        <Box width="50%" display={{ base: "none", md: "flex", lg: "flex" }}>
          <Image src={Hero} />
        </Box>
      </Box>

      <Box width="90%" m="0 auto">
        <Box width="100%" textAlign="center" mt={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Feature Products
          </Text>
        </Box>

        <Box
          width="100%"
          display="flex"
          justifyContent="space-evenly"
          flexWrap="wrap"
          p={4}
        >
          {isSuccess &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

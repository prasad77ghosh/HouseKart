import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetails } from "../../Actions/Products";
import Slider from "react-slick";
import { Rating } from "@material-ui/lab";
import ReviewSubmit from "../ExtraComponents/ReviewSubmit";
import MetaData from "../../MetaData";
import {
  Box,
  Image,
  Button,
  Text,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { addItemsToCart } from "../../Actions/CartAct";

import ReviewCard from "./ReviewCard";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const {
    loading,
    data: product,
    error,
  } = useSelector((state) => state.ProductDetailsReducer);
  const { id } = useParams();
  const toast = useToast();

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast({
      title: "add to cart successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      toast({
        title: `Product stock is ${product.Stock}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast({
        title: "Minimum quantity must be 1",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  //React Star
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  // Slider Options
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);

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
      <MetaData title="HOUSE-KART-(PRODUCT_DETAILS)" />
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="10%"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        product && (
          <>
            <Box bg="purple.900" minH="70vh">
              <Box
                width={{ base: "70%", md: "80%" }}
                margin="0 auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: "10", md: "20" }}
                color="gray.100"
                mt="2rem"
                mb="2rem"
                borderRadius="20px"
              >
                <Box>
                  <Slider {...settings} className="carosel-slider">
                    {product.images &&
                      product.images.map((item, i) => (
                        <Image
                          className="carosel-img"
                          key={item.url}
                          src={item.url}
                          alt={`${i} Slide`}
                          width={{ base: "40%", md: "100%" }}
                          height={{ base: "250px", md: "500px" }}
                          objectFit="contain"
                          p={2}
                        />
                      ))}
                  </Slider>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={{ base: "4", md: "6" }}
                >
                  <Box>
                    <Text fontSize="2xl" fontWeight="medium">
                      {product.name}
                    </Text>
                    <Text fontSize="xs">Product :- #{product._id}</Text>
                  </Box>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Rating {...options} />
                    <Text>({product.numOfReviews} Reviews)</Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize="xl"
                      fontWeight="medium"
                    >{`Price :  ₹ ${product.price}`}</Text>
                    <Box display="flex" alignItems="center" gap={2} mt={5}>
                      <Button colorScheme="purple" onClick={decreaseQuantity}>
                        <Text fontSize="3xl" mb={1}>
                          -
                        </Text>
                      </Button>
                      <Input
                        value={quantity}
                        type="number"
                        width="55px"
                        textAlign="center"
                        readOnly
                      />
                      <Button colorScheme="purple" onClick={increaseQuantity}>
                        <Text fontSize="2xl" mb={1}>
                          +
                        </Text>
                      </Button>
                    </Box>
                  </Box>

                  <Box fontSize="xl" display="flex" alignItems="center" gap={3}>
                    <Button
                      colorScheme={"orange"}
                      isDisabled={product.Stock < 1 ? true : false}
                      size="sm"
                      borderRadius="15px"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                    <Text color={product.Stock < 1 ? "red" : "greenyellow"}>
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="xl" fontWeight="medium">
                      Description :
                    </Text>
                    <Text>{product.description}</Text>
                  </Box>
                  <ReviewSubmit />
                </Box>
              </Box>
            </Box>

            <Box>
              <Box>
                {product.reviews && product.reviews[0] ? (
                  <>
                    <Box
                      borderBottom="2px solid tomato"
                      width={{ base: "50%", md: "10%" }}
                      margin="0 auto"
                    >
                      <Text
                        textAlign="center"
                        fontSize="xl"
                        fontWeight="bold"
                        mt={5}
                      >
                        REVIEWS
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="column" mt={5}>
                      {product.reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                      ))}
                    </Box>
                  </>
                ) : (
                  <Text textAlign="center" fontWeight="bold" m={3}>
                    No Reviews Yet
                  </Text>
                )}
              </Box>
            </Box>
          </>
        )
      )}
    </>
  );
};

export default ProductDetails;

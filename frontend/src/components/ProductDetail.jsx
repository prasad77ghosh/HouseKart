import {
  Box,
  Button,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../Slices/ProductDetailSlice";
import { reset } from "../Slices/ProductDetailSlice";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
const ProductDetail = () => {
  const { product, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.product_details
  );
  const toast = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Slider Options
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //React Star
  const options = {
    edit: false,
    color: "lightgray",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  useEffect(() => {
    dispatch(ProductDetails(id));
  }, [dispatch, id]);

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
        height="100%"
      >
        <Spinner size="xl" />
      </Box>
    );
  }
  return (
    <>
      {isSuccess && (
        <Box
          bg="gray.700"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap="4rem"
          p={4}
          minH="100vh"
        >
          <Box>
            <Slider {...settings} className="carosale-slider">
              {product.images &&
                product.images.map((item, i) => (
                  <Image
                    className="carosel-img"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Slider>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="6"
            justifyContent={{ base: "center" }}
          >
            <Box>
              <Text color="#efefef" fontSize="2xl" fontWeight="medium">
                {product.name}
              </Text>
              <Text color="#efefef" fontSize="13px">
                Product:- #{product._id}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap={3}>
              <ReactStars {...options} />
              <Text color="#efefef" mt={1}>
                ({product.numOfReviews} Reviews)
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap={4}>
              <Text
                color="#efefef"
                fontSize="16px"
              >{` Price: ₹ ${product.price}`}</Text>
              <Text>
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "  OutOfStock" : "  InStock"}
                </b>
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Button fontSize="xl">+</Button>
              <Input
                value="1"
                type="number"
                width="50px"
                textAlign="center"
                color="#efefef"
                fontSize="xl"
              />
              <Button fontSize="xl">-</Button>
              <Button ml={3} size="sm">
                Add To Cart
              </Button>
            </Box>
            <Box color="#efefef">
              Description : <Text>{product.description}</Text>
            </Box>
            <Button>Submit Review</Button>
          </Box>
        </Box>
      )}

      <Box>
        <Text textAlign="center" fontSize="xl" fontWeight="medium">
          Product Reviews
        </Text>
        {product.reviews && product.reviews[0] ? (
          <Box>
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </Box>
        ) : (
          <Text>No Reviews Yet</Text>
        )}
      </Box>
    </>
  );
};

export default ProductDetail;

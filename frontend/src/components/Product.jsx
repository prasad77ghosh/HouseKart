import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom";

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
    
      <Link to = {`product/${product._id}`}>
        <Box
          bg="gray.400"
          px={2}
          py={3}
          textAlign="center"
          mt={4}
          width="230px"
          height="400px"
          borderRadius="5px"
          cursor="pointer"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image
              src={product.images[0].url}
              alt={product.name}
              width="200px"
            />
          </Box>
          <Box display="flex" gap="5px" flexDirection="column" mt={4}>
            <Text fontSize="xl">{product.name.toLowerCase()}</Text>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              justifyContent="center"
            >
              <ReactStars {...options} />
              <Text fontSize="13px">{`(${product.numOfReviews}  Reviews)`}</Text>
            </Box>
            <Text>{`Price: ₹${product.price}`}</Text>
          </Box>
        </Box>
      </Link>
  );
};

export default Product;

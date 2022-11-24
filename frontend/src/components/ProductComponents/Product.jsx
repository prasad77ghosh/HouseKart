import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <Link to={`product/${product._id}`}>
        <Box width="fit-content" bg="white" py={2} borderRadius="5px" mt={5}>
          <Box p={1}>
            <Image
              src={product.images[0].url}
              alt={product.name}
              width="250px"
              height="300px"
              objectFit="contain"
            />
          </Box>
          <Box p={1} display="flex" flexDirection="column" gap={3}>
            <Text fontSize="xl" fontWeight="medium" textAlign="center">
              {product.name}
            </Text>
            <Box
              display="flex"
              alignItems="center"
              gap={3}
              justifyContent="center"
            >
              <Rating {...options} />
              <Text
                fontSize="sm"
                fontWeight="medium"
              >{`(${product.numOfReviews}  Reviews)`}</Text>
            </Box>
            <Text textAlign="center">{`Price : ₹${product.price}`}</Text>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default Product;

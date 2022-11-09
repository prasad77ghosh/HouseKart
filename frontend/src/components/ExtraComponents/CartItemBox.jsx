import { Box, Image, Text, Badge } from "@chakra-ui/react";
import React from "react";
const CartItemBox = ({ item, deleteItemFromCart }) => {
  return (
    <>
      <Box display="flex">
        <Box>
          <Image
            src={item.image}
            alt="item-img"
            width={{ base: "70px", md: "100px" }}
            height={{ base: "70px", md: "100px" }}
            objectFit="contain"
          />
        </Box>
        <Box>
          <Text fontWeight="medium" fontSize={{ base: "13px", md: "19px" }}>
            {item.name}
          </Text>
          <Text
            fontSize={{ base: "10px", md: "15px" }}
            fontWeight="medium"
          >{`Price :- ₹ ${item.price}`}</Text>
          <Badge
            colorScheme="red"
            cursor="pointer"
            width={{ base: "50px", md: "60px" }}
            fontSize={{ base: "10px", md: "12px" }}
            p={{ base: "3px", md: "0" }}
            textAlign="center"
            onClick={() => deleteItemFromCart(item.product)}
          >
            Remove
          </Badge>
        </Box>
      </Box>
    </>
  );
};

export default CartItemBox;

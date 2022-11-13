import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const OrderSeccess = () => {
  return (
    <>
      <Box
        margin="10% auto"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={2}
        bg="gray.100"
        p={5}
        borderRadius="10px"
        width="fit-content"
      >
        <BsCheckCircleFill size="50" color="green" />
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium">
          Your Orders has been Placed Successfully..
        </Text>
        <Link to = "/order/me">
          <Button colorScheme="facebook">View Orders</Button>
        </Link>
      </Box>
    </>
  );
};

export default OrderSeccess;

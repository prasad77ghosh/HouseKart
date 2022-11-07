import { Box, Container, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import Kart from "../img/kart.png";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import MobilaNavbar from "./ExtraComponents/MobilaNavbar";
const Navbar = () => {
  return (
    <>
      <Box
        width="100%"
        bg="purple.600"
        position="sticky"
        color="gray.100"
        top="0"
        left="0"
        right="0"
        p={{ base: 1, md: 0, lg: 0 }}
        zIndex="1"
      >
        <Container maxW={{ base: "99%", md: "90%", lg: "90%" }}>
          <Flex align="center" justify="space-between">
            <Link to="/">
              <Flex align="center">
                <Image
                  src={Kart}
                  alt="Logo"
                  boxSize={{ base: "40px", md: "60px", lg: "60px" }}
                />
                <Text
                  fontSize={{ base: "xl", md: "2xl", lg: "2xl" }}
                  fontWeight="bold"
                >
                  HouseKart
                </Text>
              </Flex>
            </Link>

            <HStack
              spacing={{ md: "5", lg: "10" }}
              display={{ base: "none", md: "flex", lg: "flex" }}
            >
              <Link to="/">
                <Text fontWeight="medium">Home</Text>
              </Link>
              <Link to="/products">
                <Text fontWeight="medium">Products</Text>
              </Link>
              <Link to="/contact">
                <Text fontWeight="medium">Contact</Text>
              </Link>
              <Link to="/about">
                <Text fontWeight="medium">About</Text>
              </Link>
            </HStack>

            <HStack
              spacing={{ md: "3", lg: "5" }}
              display={{ base: "none", md: "flex", lg: "flex" }}
              cursor="pointer"
              alignItems="center"
            >
              <FaShoppingBag size={23} />
              <Link to = "/login">
                <BsPersonCircle size={24} />
              </Link>
            </HStack>
            <Box display={{ base: "block", md: "none" }}>
              <MobilaNavbar />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;

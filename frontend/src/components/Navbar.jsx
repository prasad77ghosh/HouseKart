import { Box, Container, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import Kart from "../img/kart.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { useDisclosure } from "@chakra-ui/react";
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        width="100%"
        bg="gray.400"
        position="sticky"
        top="0"
        left="0"
        right="0"
        p={{ base: 1, md: 0, lg: 0 }}
        zIndex = "1"
      >
        <Container maxW={{ base: "99%", md: "90%", lg: "90%" }}>
          <Flex align="center" justify="space-between">
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
            >
              <FaSearch size={23} />
              <FaShoppingBag size={23} />
              <BsPersonCircle size={23} />
            </HStack>
            <Box
              display={{ base: "block", md: "none", lg: "none" }}
              onClick={() => {
                onOpen();
              }}
            >
              <BiMenu size={25} />
            </Box>
          </Flex>
        </Container>
      </Box>
      <MobileMenuDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;

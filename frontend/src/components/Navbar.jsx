import { Box, Container, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import Kart from "../img/kart.png";
import { Link,NavLink } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import MobilaNavbar from "./ExtraComponents/MobilaNavbar";
import UserOptions from "./ExtraComponents/UserOptions";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  const { CartItems } = useSelector((state) => state.Cart);
  const { pathname } = useLocation();
  if (
    pathname === "/admin/dashboard" ||
    pathname === "/admin/products" ||
    pathname === "/admin/users" ||
    pathname === "/admin/reviews" ||
    pathname === "/admin/orders" ||
    pathname === "/admin/product"
  )
    return null;

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
              {user && user.role === "admin" ? (
                <Link to="admin/dashboard">
                  <Text fontWeight="medium">Dashboard</Text>
                </Link>
              ) : (
                <></>
              )}
            </HStack>

            <HStack
              spacing={{ md: "3", lg: "5" }}
              display={{ base: "none", md: "flex", lg: "flex" }}
              cursor="pointer"
              alignItems="center"
            >
              <Link to="/cart">
                <Box position="relative">
                  {CartItems.length >= 1 && (
                    <>
                      <Box
                        bg="red"
                        fontWeight="medium"
                        textAlign="center"
                        borderRadius="full"
                        position="absolute"
                        padding={1}
                        left="15px"
                        bottom="10px"
                        height="21px"
                      >
                        <Text fontSize="12px">{CartItems.length}</Text>
                      </Box>
                    </>
                  )}
                  <FaShoppingBag size={23} />
                </Box>
              </Link>
              {isAuthenticated ? (
                <UserOptions user={user} />
              ) : (
                <Link to="/login">
                  <BsPersonCircle size={24} />
                </Link>
              )}
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

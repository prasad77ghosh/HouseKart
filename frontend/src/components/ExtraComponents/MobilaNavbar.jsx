import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Image,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { FaShoppingBag } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import Kart from "../../img/kart.png";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const MobilaNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
    const { CartItems } = useSelector((state) => state.Cart);
  return (
    <>
      <Box display="flex" alignItems="center" gap={3}>
        <Box>
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
              <FaShoppingBag size={22} />
            </Box>
          </Link>
        </Box>
        <Box mt="1px">
          {isAuthenticated ? (
            <UserOptions user={user} />
          ) : (
            <Link to="/login">
              <BsPersonCircle size={22} />
            </Link>
          )}
        </Box>
        <Box onClick={onOpen} mt="2px">
          <HiOutlineMenu size={23} />
        </Box>
      </Box>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay display={{ base: "block", md: "none" }} />
        <DrawerContent
          bg="purple.600"
          color="gray.100"
          display={{ base: "block", md: "none" }}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex align="center" justify="center" mt={5} mr={3}>
              <Image src={Kart} alt="Logo" boxSize="50px" />
              <Text fontSize="2xl" fontWeight="bold">
                HouseKart
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <List textAlign="center" py={3}>
              <Link to="/">
                <ListItem onClick={onClose}>
                  <Text fontWeight="medium" fontSize="20px">
                    Home
                  </Text>
                </ListItem>
              </Link>

              <Link to="/products">
                <ListItem mt={2} onClick={onClose}>
                  <Text fontWeight="medium" fontSize="20px">
                    Products
                  </Text>
                </ListItem>
              </Link>

              <Link to="/contact">
                <ListItem mt={2} onClick={onClose}>
                  <Text fontWeight="medium" fontSize="20px">
                    Contact
                  </Text>
                </ListItem>
              </Link>

              <Link to="/about">
                <ListItem mt={2} onClick={onClose}>
                  <Text fontWeight="medium" fontSize="20px">
                    About
                  </Text>
                </ListItem>
              </Link>

              {user && user.role === "admin" ? (
                <Link to="/dashboard">
                  <ListItem mt={2} onClick={onClose}>
                    <Text fontWeight="medium" fontSize="20px">
                      Dashboard
                    </Text>
                  </ListItem>
                </Link>
              ) : (
                <></>
              )}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobilaNavbar;

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

const MobilaNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box display="flex" alignItems="center" gap={3}>
        <Box>
          <FaShoppingBag size={22} />
        </Box>
        <Box mt="1px">
          <Link to="/login">
            <BsPersonCircle size={22} />
          </Link>
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
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobilaNavbar;

import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Flex,
  Image,
  Box,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Kart from "../img/kart.png";
import SearchTab from "./SearchTab";
import { FaShoppingBag } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
const MobileMenuDrawer = ({ isOpen, onClose }) => {
  const [size, setSize] = React.useState("");
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex align="center" borderBottom="2px" borderColor="gray.200">
              <Image src={Kart} alt="Logo" boxSize="60px" />
              <Text fontSize="2xl" fontWeight="bold">
                HouseKart
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Link
                to="/"
                onClick={() => {
                  onClose();
                }}
              >
                <Box fontWeight="medium" fontSize="2xl" width="100%">
                  Home
                </Box>
              </Link>
              <Link
                to="/products"
                onClick={() => {
                  onClose();
                }}
              >
                <Box fontWeight="medium" fontSize="2xl" width="100%">
                  Products
                </Box>
              </Link>
              <Link
                to="/contact"
                onClick={() => {
                  onClose();
                }}
              >
                <Box fontWeight="medium" fontSize="2xl" width="100%">
                  Contact
                </Box>
              </Link>
              <Link
                to="/about"
                onClick={() => {
                  onClose();
                }}
              >
                <Box fontWeight="medium" fontSize="2xl" width="100%">
                  About
                </Box>
              </Link>
            </VStack>
            <Flex justify="center" align="center" mt="10">
              <HStack spacing="6">
                <SearchTab />
                <FaShoppingBag size={28} />
                <BsPersonCircle size={28} />
              </HStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenuDrawer;

import React from "react";
import { BsFilter } from "react-icons/bs";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Button,
  Tooltip
} from "@chakra-ui/react";
const FilterBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Tooltip label="Filter Products" aria-label="A tooltip">
          <Box onClick={onOpen} p="3px" mb="3px">
            <BsFilter size={25} />
          </Box>
        </Tooltip>
        <Box>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>

              <DrawerBody>
                <Text>Filter Products</Text>
              </DrawerBody>

              <DrawerFooter>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default FilterBox;

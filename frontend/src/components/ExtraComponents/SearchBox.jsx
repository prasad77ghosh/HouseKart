import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Tooltip
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Tooltip label="Search Products" aria-label="A tooltip">
          <Box onClick={onOpen} p={1}>
            <BsSearch size={20} />
          </Box>
        </Tooltip>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Search Products</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default SearchBox;

import { Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "./SearchBar";

const SearchTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box cursor="pointer">
        <FaSearch size={23} onClick={onOpen} />
      </Box>
      <SearchBar isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SearchTab;

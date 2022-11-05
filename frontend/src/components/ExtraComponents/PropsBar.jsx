import React from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";

const PropsBar = () => {
  return (
    <>
      <Box
        display="flex"
        bg="gray.50"
        width="fit-content"
        alignItems="center"
        justifyContent="center"
        gap={2}
        px={1}
        borderRadius="10px"
        position="fixed"
        right={{base: "1rem", md: "5rem"}}
        top = "5rem"
      >
        <Box cursor="pointer">
          <SearchBox />
        </Box>

        <Box cursor="pointer">
          <FilterBox />
        </Box>
      </Box>
    </>
  );
};

export default PropsBar;

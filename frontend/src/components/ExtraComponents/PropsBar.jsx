import React from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";

const PropsBar = ({price, setPrice, category, setCategory, ratings, setRatings}) => {
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
        right={{ base: "1rem", md: "5rem" }}
        top="5rem"
      >
        <Box cursor="pointer">
          <SearchBox />
        </Box>

        <Box cursor="pointer">
          <FilterBox
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            ratings={ratings}
            setRatings={setRatings}
          />
        </Box>
      </Box>
    </>
  );
};

export default PropsBar;

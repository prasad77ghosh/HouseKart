import React from "react";
import { Skeleton, Box } from "@chakra-ui/react";

const Loader = () => {
  return (
    <>
      <Box mt="5" borderRadius="5px" >
        <Skeleton
          height="400px"
          width="250px"
          startColor="RGBA(0, 0, 0, 0.24)"
          endColor="RGBA(0, 0, 0, 0.36)"
        />
      </Box>
    </>
  );
};

export default Loader;

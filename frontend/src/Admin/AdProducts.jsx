import React, { useEffect } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { allRawProducts } from "../Actions/Products";

const AdProducts = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, data, error } = useSelector(
    (state) => state.RawProductsReducer
  );

  useEffect(() => {
    dispatch(allRawProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch({
        type: "clearError",
      });
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <Box display="flex" bg="gray.50" height="100vh" maxH="100%" p={1} gap={2}>
        <Box flexBasis="15%" position="relative">
          <Sidebar />
        </Box>
        <Box flexBasis="85%"></Box>
      </Box>
    </>
  );
};

export default AdProducts;

import React, { useState, useEffect } from "react";
import {
  useToast,
  Spinner,
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllProducts } from "../Slices/getAllProductSlice";
import { reset } from "../Slices/getAllProductSlice";

const SearchBar = ({ isOpen, onClose }) => {
  const [keyword, setKeyword] = useState("");
  const [filterData, setFilteredData] = useState([]);
  const [size, setSize] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.allProducts
  );
  // Debpunce function for searching products
  function Debounce(func, delay) {
    let timeOutId;
    return function (...args) {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    };
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  //Error handling
  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    dispatch(reset());
  }, [dispatch, isError, toast, message]);

  const handleFilter = (e) => {
    e.preventDefault();
    const wordEntered = e.target.value;
    let newFilter;
    if (isSuccess) {
      newFilter = products.filter((product) => {
        return product.name.toLowerCase().includes(wordEntered.toLowerCase());
      });
    }

    if (wordEntered === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    setKeyword(wordEntered);
  };

  const decoretedFindSuggestion = Debounce(handleFilter, 500);

  const searchSubmitHandler = () => {
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
    setFilteredData([]);
    setKeyword("");
  };

  // Loading State
  // if (isLoading) {
  //   return (
  //     <Box
  //       p={4}
  //       width="100%"
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <Spinner size="xl" color="red.500" />
  //     </Box>
  //   );
  // }

  return (
    <>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalHeader fontSize="xl">Seach Products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" gap={2}>
              <Input
                type="text"
                placeholder="Serach products..."
                onChange={decoretedFindSuggestion}
              />
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={searchSubmitHandler}
              >
                Search
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              mt="10px"
              ml="20px"
            >
              {isLoading ? (
                <>
                  <Box
                    p={4}
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Spinner size="xl" color="red.500" />
                  </Box>
                </>
              ) : (
                <>
                  {filterData.length !== 0 && (
                    <Box>
                      {filterData.slice(0, 15).map((product) => (
                        <Link
                          to={`/product/${product._id}`}
                          key={product._id}
                          onClick={onClose}
                        >
                          <p>{product.name}</p>
                        </Link>
                      ))}
                    </Box>
                  )}
                </>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchBar;

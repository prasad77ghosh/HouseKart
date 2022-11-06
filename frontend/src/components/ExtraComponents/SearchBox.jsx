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
  Tooltip,
  Input,
  IconButton,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { allRawProducts } from "../../Actions/Products";

const SearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { loading, data, error } = useSelector(
    (state) => state.RawProductsReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { products } = data;

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

  //debounce function
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
  const handleFilter = (e) => {
    e.preventDefault();
    const wordEntered = e.target.value;
    const newFillter = products.filter((product) => {
      return product.name.toLowerCase().includes(wordEntered.toLowerCase());
    });

    if (wordEntered === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFillter);
    }
    setKeyword(wordEntered);
  };

  const decoretedFindSuggestion = Debounce(handleFilter, 300);

  const searchSubmitHandler = () => {
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
    setFilteredData([]);
    setKeyword("");
    onClose();
  };

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
              <ModalHeader>Search Products</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box display="flex" gap={3}>
                  <Input
                    placeholder="Search Products.."
                    border="2px solid black"
                    onChange={decoretedFindSuggestion}
                  />
                  <Box onClick={searchSubmitHandler}>
                    <IconButton icon={<BsSearch />} colorScheme="blue" />
                  </Box>
                </Box>

                {loading ? (
                  <>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Spinner size="lg" />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      display="flex"
                      flexDirection="column"
                      mt={4}
                      gap={3}
                      p={2}
                    >
                      {filteredData.slice(0, 15).map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id}>
                          <Text fontSize="lg" fontWeight="medium" ml={2}>
                            {product.name}
                          </Text>
                        </Link>
                      ))}
                    </Box>
                  </>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default SearchBox;

import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Textarea,
  Select,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { newProductCreation } from "../Actions/Products";
import { useDispatch, useSelector } from "react-redux";
import { MdSpellcheck } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { IoGitBranchOutline } from "react-icons/io5";
import { MdFormatListNumbered } from "react-icons/md";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  "mobile",
  "laptop",
  "computer",
  "tablet",
  "ear phone",
  "camera",
  "tech gadget",
  "men's ware",
  "female's ware",
  "kid's ware",
  "men's footware",
  "female's footware",
  "kid's footware",
];

const AdNewProduct = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const navigate = useNavigate();

  const { loading, success, error } = useSelector(
    (state) => state.createNewProduct
  );

  const createProductHandler = () => {
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(newProductCreation(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

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

    if (success) {
      toast({
        title: "Product Created Successfully..",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/admin/dashboard");
      dispatch({
        type: "newProductReset",
      });
    }
  }, [dispatch, error, success, toast]);

  return (
    <>
      <Box display="flex" bg="gray.50" height="100vh" maxH="100%" p={1} gap={2}>
        <Box flexBasis="15%" position="relative">
          <Sidebar />
        </Box>
        <Box flexBasis="85%" bg="purple.900" p={3} borderRadius="10px">
          <Text
            textAlign="center"
            fontSize="2xl"
            fontWeight="medium"
            color="gray.50"
          >
            Create New Product
          </Text>
          <Box p={2}>
            <Box
              width={{ base: "xs", md: "lg" }}
              margin="1.5rem auto"
              bg="purple.800"
              color="gray.50"
              px={6}
              py={4}
              borderRadius="10px"
            >
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdSpellcheck size={20} />}
                  />
                  <Input
                    type="text"
                    placeholder="Enter Your Product Name"
                    fontSize="16px"
                    borderColor="gray.50"
                    focusBorderColor="#68D391"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  Price
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdAttachMoney size={20} />}
                  />
                  <Input
                    type="number"
                    placeholder="Enter Your Price"
                    fontSize="16px"
                    borderColor="gray.50"
                    focusBorderColor="#68D391"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  Description
                </FormLabel>
                <InputGroup border="1px solid white" borderRadius="5px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineArticle size={20} />}
                  />
                  <Textarea
                    cols="30"
                    rows="2"
                    placeholder="Product Description"
                    ml={7}
                    border="none"
                    focusBorderColor="none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Textarea>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  Category
                </FormLabel>
                <InputGroup border="1px solid white" borderRadius="5px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoGitBranchOutline size={20} />}
                  />
                  <Select
                    placeholder="Choose Product Category"
                    border="none"
                    focusBorderColor="none"
                    ml={7}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="opt">
                        {category}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  Stocks
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdFormatListNumbered size={20} />}
                  />
                  <Input
                    type="number"
                    placeholder="Enter Your quantity of product"
                    fontSize="16px"
                    borderColor="gray.50"
                    focusBorderColor="#68D391"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  onChange={createProductImagesChange}
                />
              </div>

              <Box display="flex" width="100%" mt={4} overflow="auto">
                {imagesPreview.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt="Product Preview"
                    width="70px"
                    height="70px"
                    objectFit="cover"
                  />
                ))}
              </Box>

              <Box margin="1rem auto" display="flex" justifyContent="center">
                <Button
                  colorScheme="cyan"
                  width="50%"
                  color="gray.50"
                  size="lg"
                  isLoading={loading}
                  onClick={createProductHandler}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdNewProduct;

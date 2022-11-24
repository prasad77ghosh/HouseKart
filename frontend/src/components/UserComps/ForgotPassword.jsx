import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { passwordForgot } from "../../Actions/Profile";
import MetaData from "../../MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector(
    (state) => state.PasswordReducer
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const resetPasswordHandler = () => {
    if (!email) {
      toast({
        title: "Please Enter Email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    dispatch(passwordForgot(email));
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

    if (message) {
      navigate("/");
      toast({
        title: message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  }, [dispatch, error, message, toast, navigate]);

  return (
    <>
    <MetaData title="HOUSE-KART-(FORGOT_PASSWORD)"/>
      <Box p={2} height="100vh">
        <Box
          width={{ base: "xs", md: "lg" }}
          margin="4rem auto"
          bg="purple.900"
          color="gray.50"
          px={6}
          py={4}
          borderRadius="10px"
        >
          <Text
            textAlign="center"
            fontSize={{ base: "20px", md: "25px", lg: "25px" }}
            mb={2}
            fontWeight="medium"
          >
            Forgot Password Link
          </Text>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdOutlineEmail size={20} />}
              />
              <Input
                type="email"
                placeholder="Enter Your Email"
                fontSize="16px"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <Box
            mt={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={3}
          >
            <Button
              width="90%"
              colorScheme="teal"
              fontSize={{ base: "15px", md: "17px" }}
              letterSpacing={1}
              onClick={resetPasswordHandler}
              isLoading={loading}
            >
              Get Recover Link
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;

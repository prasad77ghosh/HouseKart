import {
  Box,
  Button,
  Divider,
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
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLogin } from "../../Actions/Auth";
import { useNavigate } from "react-router-dom";
import MetaData from "../../MetaData";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.AuthReducer
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
    dispatch(userLogin(email, password));
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

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, toast, isAuthenticated, navigate]);

  return (
    <>
      <MetaData title="HOUSE-KART-(LOGIN)"/>
      <Box p={2}>
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
            Login To Your Account
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              Passoword
            </FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Box onClick={() => setShow(!show)} cursor="pointer">
                  {show ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </Box>
              </InputLeftElement>
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Your Password"
                fontSize="16px"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                onChange={(e) => setPassword(e.target.value)}
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
              isLoading={loading}
              onClick={submitHandler}
            >
              Login
            </Button>
            <Link to="/password/forgot">
              <Box textAlign="center">
                <Button colorScheme="cyan" variant="link">
                  Forgot Password
                </Button>
              </Box>
            </Link>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mt={2}
          >
            <Divider color="black"></Divider>
            <Text>or</Text>
            <Divider></Divider>
          </Box>
          <Link to="/register">
            <Box textAlign="center" mt={4}>
              <Button colorScheme="cyan" variant="link">
                Register To Your Account
              </Button>
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;

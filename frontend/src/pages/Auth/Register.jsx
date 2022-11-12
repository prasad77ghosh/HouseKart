import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "../../img/Profile.png";
import { userRegister } from "../../Actions/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState(false);
  const [showC, setShowC] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(Profile);
  const [avatarPreview, setAvatarPreview] = useState(Profile);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.AuthReducer
  );

  // Image Upload
  const imageUploadHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const registerHandler = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords did not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    dispatch(userRegister(name, email, password, avatar));
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
      <Box p={2} height="100vh">
        <Box
          width={{ base: "xs", md: "lg" }}
          margin="2rem auto"
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
          >
            Register Your Account
          </Text>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsFillPersonFill size={20} />}
              />
              <Input
                type="text"
                placeholder="Enter Your Name"
                fontSize="16px"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </FormControl>
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
          <Box display={{ base: "block", md: "flex" }} gap={3}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Box onClick={() => setShowC(!showC)} cursor="pointer">
                    {showC ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </Box>
                </InputLeftElement>
                <Input
                  type={showC ? "text" : "password"}
                  placeholder="Enter Your Confirm Password"
                  fontSize="16px"
                  borderColor="gray.50"
                  focusBorderColor="#68D391"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Box>

          <FormControl mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              Upload Your Profile Pic
            </FormLabel>
            <Box display="flex" alignItems="center" gap={10}>
              <Image
                src={avatarPreview}
                alt="Profile Preview"
                width="55px"
                height="55px"
                objectFit="cover"
                borderRadius="50%"
              />

              <Box>
                <Input
                  type="file"
                  width="120px"
                  opacity={0}
                  zIndex="1"
                  cursor="pointer"
                  accept="image/*"
                  onChange={imageUploadHandler}
                />
                <Button
                  position="absolute"
                  left="90px"
                  width="120px"
                  colorScheme="blue"
                  variant="outline"
                  fontSize={{ base: "13px", md: "15px" }}
                  letterSpacing={1}
                >
                  Browse
                </Button>
              </Box>
            </Box>
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
              fontSize={{ base: "13px", md: "15px" }}
              letterSpacing={1}
              onClick={registerHandler}
              isLoading={loading}
            >
              Register
            </Button>
            <Link to="/login">
              <Box textAlign="center" mt={1}>
                <Button colorScheme="cyan" variant="link">
                  Login To Your Account
                </Button>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;

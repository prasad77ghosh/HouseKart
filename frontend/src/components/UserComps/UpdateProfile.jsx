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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUpdate } from "../../Actions/Profile";
import Profile from "../../img/Profile.png";
import { userInfo } from "../../Actions/Auth";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(Profile);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthReducer);
  const { loading, isUpdated, error } = useSelector(
    (state) => state.ProfileReducer
  );
  // Image Upload
  const imageUpdateHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  console.log(avatar);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
  }, [user]);

  const updateProfileHandler = () => {
    dispatch(profileUpdate(name, email, avatar));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    if (isUpdated) {
      toast({
        title: "Profile updated successfully..",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(userInfo());
      navigate("/account");
      dispatch({
        type: "updateProfileReset",
      });
    }
  }, [dispatch, error, isUpdated, toast, navigate]);
  return (
    <>
      <Box p={2}>
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
            Update Your Account
          </Text>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>Name</FormLabel>
            <InputGroup>
              <InputLeftElement children={<BsFillPersonFill size={20} />} />
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
              <InputLeftElement children={<MdOutlineEmail size={20} />} />
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
                  onChange={imageUpdateHandler}
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
              isLoading={loading}
              onClick={updateProfileHandler}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProfile;

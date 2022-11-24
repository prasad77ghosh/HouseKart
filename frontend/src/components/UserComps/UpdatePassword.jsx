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
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { passwordUpdate } from "../../Actions/Profile";
import MetaData from "../../MetaData";

const UpdatePassword = () => {
  const [showO, setShowO] = useState(false);
  const [showN, setShowN] = useState(false);
  const [showC, setShowC] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { loading, isUpdated, error } = useSelector(
    (state) => state.ProfileReducer
  );

  const passwordChangeHandler = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    dispatch(passwordUpdate(oldPassword, newPassword, confirmPassword));
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
        title: "Password changed successfully..",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
      dispatch({
        type: "updatePasswordReset",
      });
    }
  }, [dispatch, error, isUpdated, toast, navigate]);

  return (
    <>
      <MetaData title="HOUSE-KART-(UPDATE_PASSWORD)"/>
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
            Change Your Password
          </Text>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              Old Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Box onClick={() => setShowO(!showO)} cursor="pointer">
                  {showO ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </Box>
              </InputLeftElement>
              <Input
                type={showO ? "text" : "password"}
                placeholder="Enter Your Old Password"
                fontSize="16px"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              New Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Box onClick={() => setShowN(!showN)} cursor="pointer">
                  {showN ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </Box>
              </InputLeftElement>
              <Input
                type={showN ? "text" : "password"}
                placeholder="Enter Your New Password"
                fontSize="16px"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              onClick={passwordChangeHandler}
              isLoading={loading}
            >
              Change
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdatePassword;

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
import { useDispatch, useSelector } from "react-redux";
import { MdSpellcheck } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { IoGitBranchOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userDetailsOfAdmin } from "../Actions/AdUser";
import { userUpdateOfAdmin } from "../Actions/AdUser";

const AdUpdateUser = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { loading, success, error } = useSelector(
    (state) => state.UpdateUserReducer
  );
  const {
    loading: Uloading,
    user,
    error: Uerror,
  } = useSelector((state) => state.AdUserDetailsReducer);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(userDetailsOfAdmin(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [dispatch, user, id]);

  const updateUserSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(userUpdateOfAdmin(id, myForm));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Role Update Successfully..",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch({
        type: "updateUserReset",
      });
      navigate("/admin/users");
    }

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
    if (Uerror) {
      toast({
        title: Uerror,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      dispatch({
        type: "clearError",
      });
    }
  }, [dispatch, error, Uerror, toast, success, navigate]);

  return (
    <>
      <Box bg="purple.900" height="100vh">
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="medium"
          color="gray.50"
          mt={3}
        >
          UPDATE USER
        </Text>
        <Box p={2}>
          <Box
            width={{ base: "xs", md: "lg" }}
            margin="10px auto"
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
                  placeholder="Enter Your Name"
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
                Email
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdOutlineEmail size={20} />}
                />
                <Input
                  type="text"
                  placeholder="Enter Your Email"
                  fontSize="16px"
                  borderColor="gray.50"
                  focusBorderColor="#68D391"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                Role
              </FormLabel>
              <InputGroup border="1px solid white" borderRadius="5px">
                <InputLeftElement
                  pointerEvents="none"
                  children={<IoGitBranchOutline size={20} />}
                />
                <Select
                  border="none"
                  focusBorderColor="none"
                  ml={7}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option className="opt1">Choose Role</option>
                  <option value="admin" className="opt1">
                    Admin
                  </option>
                  <option value="user" className="opt1">
                    User
                  </option>
                </Select>
              </InputGroup>
            </FormControl>
            <Box margin="1rem auto" display="flex" justifyContent="center">
              <Button
                colorScheme="cyan"
                width="50%"
                color="gray.50"
                size="md"
                isLoading={loading}
                onClick={updateUserSubmitHandler}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdUpdateUser;

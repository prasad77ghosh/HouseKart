import React from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactAction } from "../Actions/AdUser";
import { useEffect } from "react";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [chat, setChat] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, success, error } = useSelector(
    (state) => state.ContactReducer
  );

  const sendMsgHandler = () => {
    dispatch(contactAction(name, email, chat));
    setName("");
    setEmail("");
    setChat("");
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Message send to admin successfully..",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      dispatch({
        type: "sendMessageReset",
      });
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
  }, [dispatch, error, success, toast]);

  return (
    <>
      <Box minH="100vh" width="80%" maxW="90%" margin="0 auto">
        <Box
          width={{ base: "100%", md: "50%" }}
          margin="0 auto"
          bg="purple.900"
          color="gray.50"
          px={7}
          py={4}
          mt={5}
          borderRadius="10px"
        >
          <Text textAlign="center" fontSize="3xl" fontWeight="bold">
            Contact Us
          </Text>

          <Box>
            <FormControl isRequired>
              <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                Name
              </FormLabel>
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
              <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                Email
              </FormLabel>
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

            <FormControl isRequired mt={2}>
              <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                Message
              </FormLabel>
              <Textarea
                placeholder="Write Yor Message"
                rows="10"
                cols="10"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              ></Textarea>
            </FormControl>

            <Box width={{ base: "60%", md: "30%" }} margin="0 auto" mt={5}>
              <Button
                colorScheme="whatsapp"
                width="100%"
                isLoading={loading}
                onClick={sendMsgHandler}
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Contact;

import React from "react";
import { Rating } from "@material-ui/lab";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Textarea,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reviewSubmit } from "../../Actions/Products";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@material-ui/core";

const ReviewSubmit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.ReviewReducer
  );
  const toast = useToast();

  const submitReviewHandler = () => {
    if (!rating || !comment) {
      toast({
        title: "All fiels required..",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    dispatch(reviewSubmit(rating, comment, id));
    onClose();
  };

    useEffect(() => {
      if (success) {
        toast({
          title: "Review submitted successfully..",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });

        dispatch({
          type: "reviewSubmitReset",
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
    }, [dispatch, error, toast, success]);


  return (
    <>
      <Button colorScheme="orange" borderRadius="20px" onClick={onOpen}>
        Create Review
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt="10%" bg="#322659" color="gray.100">
          <ModalHeader>Submit Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" gap={2}>
              <FormControl isRequired mt={2}>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  Rating
                </FormLabel>
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
              </FormControl>

              <FormControl isRequired mt={2}>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  Comment
                </FormLabel>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  resize="none"
                  cols="30"
                  rows="5"
                  mt={2}
                ></Textarea>
              </FormControl>

              <Box display="flex">
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  isLoading={loading}
                  onClick={submitReviewHandler}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewSubmit;

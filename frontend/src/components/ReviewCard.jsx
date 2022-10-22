import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import Profile from "../img/Profile.png";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "lightgray",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value: review.rating,
    isHalf: true,
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        alignItems="center"
        bg="gray.200"
        gap={4}
        p={1.5}
        width="90%"
        margin="10px auto"
        borderRadius="10px"
      >
        <Box
          ml="20px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Image src={Profile} width="50px" />
          <Text fontSize="12px" fontWeight="medium">
            {review.name}
          </Text>
        </Box>
        <Box ml="1rem">
          <ReactStars {...options} />
          <Text fontSize="12px">{review.comment}</Text>
        </Box>
      </Box>
    </>
  );
};

export default ReviewCard;

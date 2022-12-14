import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import Profile from "../../img/Profile.png";
import { Rating } from "@material-ui/lab";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Box
        bg="gray.50"
        display="flex"
        width="80%"
        margin="0 auto"
        px={5}
        py={1}
        borderRadius="10px"
        mt={2}
        mb={5}
        gap={5}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
          <Image src={Profile} alt="User" width="60px" objectFit="contain" />
          <Box width="100px" textAlign="center">
            <Text fontSize="sm" fontWeight="medium">
              {review.name}
            </Text>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="center">
          <Rating {...options} />
          <Text>{review.comment}</Text>
        </Box>
      </Box>
    </>
  );
};

export default ReviewCard;

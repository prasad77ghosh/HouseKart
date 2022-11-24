import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../MetaData";
const UserInfo = () => {
  const { user, isAuthenticated } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      <MetaData title="HOUSE-KART-(USER_INFO)"/>
      <Box bg="purple.900" color="gray.50" height="100vh">
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          textAlign="center"
          mt={4}
        >
          My Profile
        </Text>

        <Box
          display="flex"
          width={{ base: "80%", md: "80%", lg: "60%" }}
          margin="0 auto"
          mt={{ base: "0", md: "1rem" }}
          height="fit-content"
          flexDirection={{ base: "column", md: "row" }}
          p={3}
          gap={{ base: "10", md: "0" }}
          border="2px solid white"
          borderRadius="10px"
        >
          <Box
            flexBasis={{ base: "0", md: "50%" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={5}
            justifyContent="center"
          >
            <Image
              src={user.avatar.url}
              alt="profile Img"
              width={{ base: "100px", md: "200px" }}
              height={{ base: "100px", md: "200px" }}
              objectFit="cover"
              borderRadius="full"
            />
            <Button
              colorScheme="whatsapp"
              size="sm"
              onClick={() => navigate("/me/update")}
            >
              Edit Profile
            </Button>
          </Box>
          <Box
            flexBasis={{ base: "0", md: "50%" }}
            display="flex"
            flexDirection="column"
            gap={{ base: "2", md: "6" }}
            alignItems={{ base: "center", md: "start" }}
          >
            <Box textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="xl" fontWeight="medium">
                Full Name
              </Text>
              <Text fontSize="sm">{user.name}</Text>
            </Box>
            <Box textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="xl" fontWeight="medium">
                Email
              </Text>
              <Text fontSize="sm">{user.email}</Text>
            </Box>
            <Box textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="xl" fontWeight="medium">
                Joined On
              </Text>
              <Text fontSize="sm">
                {String(user.createdAt).substring(0, 10)}
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
            >
              <Button colorScheme="purple" size="sm">
                My Orders
              </Button>
              <Button
                colorScheme="purple"
                size="sm"
                onClick={() => navigate("/password/update")}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserInfo;

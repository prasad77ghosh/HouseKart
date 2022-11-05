import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Link,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Appstore from "../img/Appstore.png";
import Playtore from "../img/playstore.png";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <Box width="100%" bg="purple.800" p={4} mt="auto" color = "gray.100">
      <Container
        maxW={{ base: "100%", md: "100%", lg: "70%" }}
        textAlign="center"
      >
        <Stack
          direction={{ base: "column", md: "row", lg: "row" }}
          spacing={{ base: 6, md: "auto", lg: "auto" }}
        >
          <Flex justify="center" align="center">
            <Stack direction="column" textAlign="center">
              <Text
                fontWeight="bold"
                fontSize={{ base: "xl", md: "2xl", lg: "2xl" }}
              >
                DOWNLOAD OUR APP
              </Text>
              <Text fontWeight="medium">
                Dowload our app on Android and IOS platform
              </Text>
              <Flex gap={5} align="center" justify="center">
                <Image
                  src={Appstore}
                  width={{ base: "8rem", md: "10rem", lg: "10rem" }}
                />
                <Image
                  src={Playtore}
                  width={{ base: "8rem", md: "10rem", lg: "10rem" }}
                />
              </Flex>
            </Stack>
          </Flex>
          <Flex justify="center" align="center">
            <Stack direction="column" textAlign="center">
              <Text fontWeight="medium">HouseKart</Text>
              <Text fontWeight="medium">
                High Quality is our first priority
              </Text>
              <Text fontWeight="medium">
                Copyrights 2021 &copy; MePrasadGhosh
              </Text>
            </Stack>
          </Flex>

          <Flex justify="center" align="center">
            <VStack spacing={3}>
              <Link>
                <Flex align="center" gap={2}>
                  <BsInstagram size={25} />
                  <Text fontWeight="medium">Instagram</Text>
                </Flex>
              </Link>
              <Link>
                <Flex align="center" gap={2}>
                  <BsFacebook size={25} />
                  <Text fontWeight="medium">Facebook</Text>
                </Flex>
              </Link>
              <Link>
                <Flex align="center" gap={2}>
                  <BsYoutube size={25} />
                  <Text fontWeight="medium">YoutTube</Text>
                </Flex>
              </Link>
            </VStack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

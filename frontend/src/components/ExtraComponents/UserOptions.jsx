import React from "react";
import {
  Box,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Profile from "../../img/Profile.png";
import { MdLogout } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { userLogout } from "../../Actions/Auth";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const logoutUserAction = () => {
    dispatch(userLogout());
    toast({
      title: "Logout Succesfully...",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
  };

  const navigateToAccount = () => {
    navigate("/account");
  };

  const navigateToMyOrders = () => {
    navigate("/orders/me");
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Box borderWidth="2px" borderColor="white" borderRadius="full">
            <Tooltip label="Click me" hasArrow>
              <Image
                src={user.avatar.url ? user.avatar.url : Profile}
                alt="Profile Img"
                width="40px"
                height="40px"
                objectFit="cover"
                borderRadius="full"
              />
            </Tooltip>
          </Box>
        </PopoverTrigger>
        <PopoverContent color="black" width="200px" bg="gray.100">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={10}
              gap="5"
            >
              <Tooltip label="logout" hasArrow>
                <Box onClick={logoutUserAction}>
                  <MdLogout size={25} />
                </Box>
              </Tooltip>
              <Tooltip label="account" hasArrow>
                <Box onClick={navigateToAccount}>
                  <BsPersonCircle size={25} />
                </Box>
              </Tooltip>
              <Tooltip label="Orders" hasArrow>
                <Box onClick={navigateToMyOrders}>
                  <RiShoppingBasketLine size={25} />
                </Box>
              </Tooltip>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserOptions;

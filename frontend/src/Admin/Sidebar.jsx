import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import Kart from "../img/kart.png";
import { NavLink, Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";

const Sidebar = () => {
  return (
    <>
      <Box
        bg="purple.900"
        color="gray.50"
        borderRadius="10px"
        height="100vh"
        maxH="100%"
        position="absolute"
        width="100%"
      >
        <Link to="/">
          <Box display="flex" alignItems="center" mr="40px" px={2} p={1}>
            <Image src={Kart} alt="Logo" width="60px" />
            <Text fontSize="2xl" fontWeight="bold">
              HouseKart
            </Text>
          </Box>
        </Link>
        <Box height="2px" bg="tomato" width="100%"></Box>
        <Box display="flex" flexDirection="column" gap={5} mt={3} p={5}>
          <NavLink to="/admin/dashboard">
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              bg="purple.700"
              p={3}
              borderRadius="5px"
            >
              <MdOutlineDashboard size={24} />
              <Text fontSize="lg">DashBoard</Text>
            </Box>
          </NavLink>
          <NavLink to="/admin/products">
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              bg="purple.700"
              p={3}
              borderRadius="5px"
            >
              <MdOutlinePostAdd size={24} />
              <Text fontSize="lg">All Products</Text>
            </Box>
          </NavLink>
          <NavLink to="/admin/product">
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              bg="purple.700"
              p={3}
              borderRadius="5px"
            >
              <MdAddCircleOutline size={24} />
              <Text fontSize="lg">Create Product</Text>
            </Box>
          </NavLink>
      
          <NavLink to="/admin/orders">
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              bg="purple.700"
              p={3}
              borderRadius="5px"
            >
              <RiListUnordered size={24} />
              <Text fontSize="lg">Orders</Text>
            </Box>
          </NavLink>
          <NavLink to="/admin/users">
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              bg="purple.700"
              p={3}
              borderRadius="5px"
            >
              <FiUsers size={23} />
              <Text fontSize="lg">Users</Text>
            </Box>
          </NavLink>
          <NavLink to="/admin/reviews">
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              bg="purple.700"
              p={3}
              borderRadius="5px"
            >
              <MdOutlineRateReview size={24} />
              <Text fontSize="lg">Reviews</Text>
            </Box>
          </NavLink>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;

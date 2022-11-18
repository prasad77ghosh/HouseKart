import React from "react";
import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { allRawProducts } from "../Actions/Products";
import { Link } from "react-router-dom";
import { getAllOrdersOfAdmin } from "../Actions/Order";
const DashBoard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.RawProductsReducer);
  const {
    loading,
    data: OrderData,
    error,
  } = useSelector((state) => state.AdOrderReducer);

  const { orders } = OrderData;

  useEffect(() => {
    dispatch(allRawProducts());
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  const { products } = data;

  let outOfStuck = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStuck += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
        borderColor: "#0BC5EA",
        borderWidth: 1,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStuck, products && products.length - outOfStuck],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Box display="flex" bg="gray.50" minHeight="100vh" p={1} gap={2}>
        <Box flexBasis="15%" position="relative">
          <Sidebar />
        </Box>
        <Box
          flexBasis="85%"
          bg="purple.900"
          borderRadius="10px"
          color="gray.50"
        >
          <Box textAlign="center" p={1} mt={1}>
            <Text fontSize="3xl" fontWeight="medium">
              DASHBOARD
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-evenly" mt={7}>
            <Link to="/admin/products">
              <Box
                bg="#319795"
                width="250px"
                minW="fit-content"
                p={3}
                borderRadius="10px"
                textAlign="center"
              >
                <Text fontSize="2xl" fontWeight="medium">
                  Products
                </Text>
                <Text fontSize="xl">{products && products.length}</Text>
              </Box>
            </Link>
            <Link to = "/admin/orders">
              <Box
                bg="#3182CE"
                width="250px"
                minW="fit-content"
                p={3}
                borderRadius="10px"
                textAlign="center"
              >
                <Text fontSize="2xl" fontWeight="medium">
                  Orders
                </Text>
                <Text fontSize="xl">{orders && orders.length}</Text>
              </Box>
            </Link>
            <Box
              bg="#00A3C4"
              width="250px"
              minW="fit-content"
              p={3}
              borderRadius="10px"
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="medium">
                Users
              </Text>
              <Text fontSize="xl">1000</Text>
            </Box>
            <Box
              bg="purple.800"
              width="250px"
              minW="fit-content"
              p={3}
              borderRadius="10px"
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="line-state">
                Total Amount
              </Text>
              <Text fontSize="xl">₹ 4500000</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={20}
            gap={8}
          >
            <Box
              width="700px"
              height="400px"
              p={5}
              bg="gray.800"
              borderRadius="5px"
            >
              <Line data={lineState} />
            </Box>
            <Box width="400px" p={5} bg="gray.800" borderRadius="5px">
              <Doughnut data={doughnutState} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashBoard;

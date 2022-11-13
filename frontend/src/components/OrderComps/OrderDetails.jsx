import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Spinner, Text, useToast, Image } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { detailsOfOrder } from "../../Actions/Order";
import { useEffect } from "react";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const toast = useToast();
  const { loading, order, error } = useSelector(
    (state) => state.OrderDetailsReducer
  );

  useEffect(() => {
    dispatch(detailsOfOrder(id));
  }, [dispatch, id]);

  console.log(order);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [dispatch, toast, error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Box margin="4rem auto">
            <Spinner size="xl" color="#322659" />
          </Box>
        </>
      ) : (
        <Box minH="100vh">
          <Box width="90%" margin="0 auto">
            <Text
              textAlign="center"
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold"
              mt={2}
            >{`Order #${order && order._id}`}</Text>
          </Box>
          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            width="90%"
            margin="0 auto"
            bg="purple.900"
            borderRadius="10px"
            color="gray.50"
            p="1rem"
            gap={5}
            mt={5}
            mb="2rem"
          >
            <Box flexBasis={{ base: "100%", md: "60%" }}>
              <Box p={5} borderRadius="10px" bg="purple.800">
                <Box borderBottom="2px solid tomato" width="fit-content" p={2}>
                  <Text fontSize="2xl" fontWeight="medium">
                    Shipping Info
                  </Text>
                </Box>
                <Box mt={4} ml={5}>
                  <Text>
                    <span className="ft">Name: </span>
                    {order.user && order.user.name}
                  </Text>
                  <Text>
                    <span className="ft">Phone No: </span>{" "}
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </Text>
                  <Text>
                    <span className="ft">Address: </span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </Text>
                </Box>
              </Box>
              <Box
                p={5}
                borderRadius="10px"
                bg="purple.800"
                mt={4}
                height="380px"
                overflowY="scroll"
              >
                <Box borderBottom="2px solid tomato" width="fit-content" p={2}>
                  <Text fontSize="2xl" fontWeight="medium">
                    Your Order Items
                  </Text>
                </Box>
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <Link to={`/product/${item.product}`} key={item.product}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={5}
                        bg="purple.900"
                        p={3}
                        borderRadius="10px"
                      >
                        <Image
                          src={item.image}
                          alt="product"
                          width="100px"
                          height="100px"
                          objectFit="contain"
                        />
                        <Box textAlign="center">
                          <span className="ft">{item.name}</span>
                          <Text fontSize="13px" mt={2}>
                            {`${item.quantity} X ${item.price} = `}
                            <span>{`₹ ${item.quantity * item.price}`}</span>
                          </Text>
                        </Box>
                      </Box>
                    </Link>
                  ))}
              </Box>
            </Box>
            <Box flexBasis={{ base: "100%", md: "40%" }}>
              <Box
                width="100%"
                margin="0 auto"
                p={5}
                borderRadius="10px"
                bg="purple.800"
              >
                <Box
                  borderBottom="2px solid tomato"
                  width="fit-content"
                  p={2}
                  margin="0 auto"
                >
                  <Text fontSize="2xl" fontWeight="medium">
                    Payment
                  </Text>
                </Box>
                <Box textAlign="center" mt={3}>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>

                  <Box
                    display="flex"
                    gap={3}
                    justifyContent="center"
                    mt={4}
                    fontSize="xl"
                  >
                    <Text>Amount :-</Text>
                    <span>₹ {order.totalPrice && order.totalPrice}</span>
                  </Box>
                </Box>
              </Box>
              <Box
                width="100%"
                margin="0 auto"
                p={5}
                borderRadius="10px"
                bg="purple.800"
                mt={5}
              >
                <Box
                  borderBottom="2px solid tomato"
                  width="fit-content"
                  p={2}
                  margin="0 auto"
                >
                  <Text fontSize="2xl" fontWeight="medium">
                    Order Status
                  </Text>
                </Box>
                <Box textAlign="center" mt={3}>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }

                    style = {{fontSize: "20px", fontWeight: "700"}}
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OrderDetails;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Spinner,
  Text,
  useToast,
  Image,
  Select,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { detailsOfOrder } from "../Actions/Order";
import { updateOrderOfAdmin } from "../Actions/Order";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdUpdateOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const toast = useToast();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { loading, order, error } = useSelector(
    (state) => state.OrderDetailsReducer
  );
  const {
    loading: updateLoading,
    success,
    error: updateError,
  } = useSelector((state) => state.AdOrderUpdateReducer);

  console.log(id)
  useEffect(() => {
    dispatch(detailsOfOrder(id));
  }, [dispatch, id]);

  const updateOrderHandler = () => {
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrderOfAdmin(id, myForm));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: `Order ${status} successfully..`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/admin/orders");
      dispatch({
        type: "updateOrderReset",
      });
    }
  }, [dispatch, success, error]);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: "clearError",
      });
    }

    if (updateError) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: "clearError",
      });
    }
  }, [dispatch, toast, error, updateError]);

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
                    Process Order
                  </Text>
                </Box>

                <Box width="60%" margin="0 auto" mt={5}>
                  <FormControl isRequired>
                    <Select
                      placeholder="Change Order Status"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped" className="opt1">
                          Shipped
                        </option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered" className="opt1">
                          Delivered
                        </option>
                      )}
                    </Select>
                  </FormControl>

                  <Box width="50%" margin="15px auto">
                    <Button
                      width="100%"
                      colorScheme="whatsapp"
                      fontSize="lg"
                      isDisabled={status === ""}
                      isLoading={updateLoading}
                      onClick={updateOrderHandler}
                    >
                      Process
                    </Button>
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
                    style={{ fontSize: "20px", fontWeight: "700" }}
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

export default AdUpdateOrder;

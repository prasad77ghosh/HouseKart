import { Text, Box, Image, Button } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutStep from "../ExtraComponents/CheckOutStep";
import { useSteps } from "chakra-ui-steps";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { nextStep, activeStep } = useSteps({
    initialStep: 1,
  });
  const { ShippingInfo, CartItems } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  const Address = `${ShippingInfo.address}, ${ShippingInfo.city}, ${ShippingInfo.state}, ${ShippingInfo.pinCode},${ShippingInfo.country}`;
  const subtotal = CartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("order_info", JSON.stringify(data));
    navigate("/process/payment");
    nextStep();
  };

  return (
    <>
      <Box>
        <CheckOutStep activeStep={activeStep} />
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
                  <span className="ft">Name: </span> {user.name}
                </Text>
                <Text>
                  <span className="ft">Phone No: </span> {ShippingInfo.phoneNo}
                </Text>
                <Text>
                  <span className="ft">Address: </span>
                  {Address}
                </Text>
              </Box>
            </Box>
            <Box
              p={5}
              borderRadius="10px"
              bg="purple.800"
              mt={4}
              height="500px"
              overflowY="scroll"
            >
              <Box borderBottom="2px solid tomato" width="fit-content" p={2}>
                <Text fontSize="2xl" fontWeight="medium">
                  Your Cart Items
                </Text>
              </Box>
              {CartItems &&
                CartItems.map((item) => (
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
                  Order Summery
                </Text>
              </Box>
              <Box mt={10} display="flex" flexDirection="column" gap={3}>
                <Box display="flex" justifyContent="space-between">
                  <span className="ft">Sub Total : </span>
                  <Text>{`₹ ${subtotal}`}</Text>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <span className="ft">Shipping Charges : </span>
                  <Text>{`₹ ${shippingCharges}`}</Text>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <span className="ft">GST : </span>
                  <Text>{`₹ ${tax}`}</Text>
                </Box>

                <Box my={3} height="2px" bg="tomato"></Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize="20px"
                >
                  <span className="ft" style={{ fontSize: "20px" }}>
                    Total Price :{" "}
                  </span>
                  <Text>{`₹ ${totalPrice}`}</Text>
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt={5}>
              <Button
                colorScheme="orange"
                borderRadius="full"
                onClick={proceedToPayment}
              >
                Proceed To Payment
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmOrder;

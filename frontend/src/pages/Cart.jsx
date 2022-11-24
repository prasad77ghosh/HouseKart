import React from "react";
import { useEffect } from "react";
import CartItemBox from "../Components/ExtraComponents/CartItemBox";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../Actions/CartAct";
import { removeItemFromCart } from "../Actions/CartAct";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const { CartItems } = useSelector((state) => state.Cart);
  const { isAuthenticated } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  // Increase Quantity
  const increaseQuantityHandler = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Decrease Quantity
  const decreaseQuantityHandler = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  //remove item from cart
  const deleteItemFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkOutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <MetaData title="HOUSE-KART-(CART)" />
      {CartItems.length === 0 ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap={3}
            justifyContent="center"
            minH="100vh"
          >
            <MdRemoveShoppingCart size={50} color="#322659" />
            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="medium">
              No Product In Your Cart
            </Text>
            <Link to="/products">
              <Button colorScheme="orange">View All Product</Button>
            </Link>
          </Box>
        </>
      ) : (
        <>
          <Box
            width={{ base: "95%", md: "90%" }}
            margin="1rem auto"
            mb="3rem"
            minH="100vh"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={2}
              px={5}
              fontWeight="medium"
              borderRadius="5px"
              bg="purple.900"
              color="gray.50"
            >
              <Box flexBasis={{ base: "40%", md: "60%" }}>
                <Text ml="1rem">Product</Text>
              </Box>
              <Box
                flexBasis={{ base: "60%", md: "40%" }}
                display="flex"
                justifyContent="space-between"
              >
                <Text ml="2rem">Quantity</Text>
                <Text>SubTotal</Text>
              </Box>
            </Box>
            {CartItems &&
              CartItems.map((item) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  py={2}
                  px={5}
                  mt={5}
                  key={item.product}
                >
                  <Box flexBasis={{ base: "45%", md: "60%" }}>
                    <CartItemBox
                      item={item}
                      deleteItemFromCart={deleteItemFromCart}
                    />
                  </Box>
                  <Box
                    flexBasis={{ base: "55%", md: "40%" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={{ base: "1", md: "2" }}
                    >
                      <Button
                        size={{ base: "xs", md: "sm" }}
                        onClick={() =>
                          decreaseQuantityHandler(item.product, item.quantity)
                        }
                        colorScheme="orange"
                      >
                        <Text fontSize="25px" textAlign="center" mb={1}>
                          -
                        </Text>
                      </Button>
                      <Input
                        value={item.quantity}
                        width="50px"
                        borderColor="black"
                        size={{ base: "xs", md: "sm" }}
                        textAlign="center"
                        fontWeight="medium"
                        readOnly
                      />
                      <Button
                        size={{ base: "xs", md: "sm" }}
                        onClick={() =>
                          increaseQuantityHandler(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                        colorScheme="orange"
                      >
                        <Text fontSize="20px" textAlign="center" mb={1}>
                          +
                        </Text>
                      </Button>
                    </Box>

                    <Box>
                      <Text
                        fontSize={{ base: "12px", md: "18px" }}
                        fontWeight="medium"
                      >
                        {` ₹ ${item.quantity * item.price}`}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            <Box display="flex" mt={5}>
              <Box flexBasis={{ base: "0", md: "60%" }}></Box>
              <Box flexBasis={{ base: "90%", md: "40%" }} margin="0 auto">
                <Box width="100%" height="2px" bg="gray.600"></Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  py={3}
                  px={4}
                  fontWeight="medium"
                >
                  <Text>Gross Total</Text>
                  <Text>{`₹ ${CartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</Text>
                </Box>
                <Box width="40%" margin="0 auto" mt={10}>
                  <Button
                    width="100%"
                    borderRadius="20px"
                    colorScheme="orange"
                    onClick={checkOutHandler}
                  >
                    Check Out
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Cart;

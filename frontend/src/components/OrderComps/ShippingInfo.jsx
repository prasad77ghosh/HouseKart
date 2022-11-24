import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import { Country, State } from "country-state-city";
import CheckOutStep from "../ExtraComponents/CheckOutStep";
import { InfoOfShipping } from "../../Actions/CartAct";
import { useSteps } from "chakra-ui-steps";
import { useNavigate } from "react-router-dom";
import MetaData from "../../MetaData";

import {
  Box,
  Text,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  FormLabel,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { nextStep, activeStep } = useSteps({
    initialStep: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const naviagte = useNavigate();
  const { ShippingInfo } = useSelector((state) => state.Cart);
  const [address, setAddress] = useState(ShippingInfo.address);
  const [city, setCity] = useState(ShippingInfo.city);
  const [country, setCountry] = useState(ShippingInfo.country);
  const [state, setState] = useState(ShippingInfo.state);
  const [pinCode, setPinCode] = useState(ShippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(ShippingInfo.phoneNo);

  const shippingInfoHandler = () => {
    if (!address || !city || !country || !state || !pinCode || !phoneNo) {
      toast({
        title: "Please fill all the fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (phoneNo.length !== 10) {
      toast({
        title: `Phone number has ${phoneNo.length} digits it should be 10 digits long`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    dispatch(
      InfoOfShipping({ address, city, country, state, pinCode, phoneNo })
    );

    nextStep();
    naviagte("/order/confirm");
  };

  return (
    <>
      <MetaData title="HOUSE-KART-(ORDER_SHIPPING_INFO)"/>
      <Box p={2}>
        <CheckOutStep activeStep={activeStep} />
        <Box
          width={{ base: "xs", md: "lg" }}
          margin="2rem auto"
          bg="purple.900"
          color="gray.50"
          px={6}
          py={4}
          borderRadius="10px"
          mb={5}
        >
          <Text
            textAlign="center"
            fontSize={{ base: "20px", md: "25px", lg: "25px" }}
            mb={2}
          >
            Shipping Information
          </Text>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              Address
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaAddressCard size={25} />}
              />
              <Input
                type="text"
                placeholder="Enter Your Address"
                fontSize="16px"
                variant="flushed"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>City</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<GiModernCity size={25} />}
              />
              <Input
                type="text"
                placeholder="Enter Your City"
                fontSize="16px"
                variant="flushed"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              PinCode
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdPinDrop size={25} />}
              />
              <Input
                type="text"
                placeholder="Enter Your PinCode"
                fontSize="16px"
                variant="flushed"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              Mobile No.
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdLocalPhone size={25} />}
              />
              <Input
                type="number"
                placeholder="Enter Your Mobile No"
                fontSize="16px"
                variant="flushed"
                borderColor="gray.50"
                focusBorderColor="#68D391"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel fontSize={{ base: "12px", md: "15px" }}>
              Country
            </FormLabel>
            <Select
              placeholder="Select Country"
              fontSize="16px"
              variant="flushed"
              borderColor="gray.50"
              focusBorderColor="#68D391"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {Country &&
                Country.getAllCountries().map((cnt) => (
                  <option
                    key={cnt.isoCode}
                    value={cnt.isoCode}
                    style={{
                      color: "white",
                      background: "black",
                      marginLeft: "10px",
                    }}
                  >
                    {cnt.name}
                  </option>
                ))}
            </Select>
          </FormControl>

          {country && (
            <>
              <FormControl isRequired mt={2}>
                <FormLabel fontSize={{ base: "12px", md: "15px" }}>
                  State
                </FormLabel>
                <Select
                  placeholder="Select State"
                  fontSize="16px"
                  variant="flushed"
                  borderColor="gray.50"
                  focusBorderColor="#68D391"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {State &&
                    State.getStatesOfCountry(country).map((st) => (
                      <option
                        key={st.isoCode}
                        value={st.isoCode}
                        style={{
                          color: "white",
                          background: "black",
                          marginLeft: "10px",
                        }}
                      >
                        {st.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </>
          )}

          <Box
            mt={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              width="90%"
              colorScheme="teal"
              fontSize={{ base: "13px", md: "15px" }}
              letterSpacing={1}
              onClick={shippingInfoHandler}
            >
              Submit-Info
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShippingInfo;

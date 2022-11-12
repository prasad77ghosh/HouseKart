import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdOutlineAccountBalance } from "react-icons/md";
import { Step, Steps, useSteps } from "chakra-ui-steps";

const CheckOutStep = ({ activeStep }) => {
  const steps = [
    {
      label: <Text>Shipping Details</Text>,
      icon: MdLocalShipping,
    },
    {
      label: <Text>Confirm Order</Text>,
      icon: MdLibraryAddCheck,
    },
    {
      label: <Text>Payment</Text>,
      icon: MdOutlineAccountBalance,
    },
  ];
  return (
    <>
      <Flex flexDir="column" width="90%" margin="2rem auto">
        <Steps activeStep={activeStep}>
          {steps &&
            steps.map((step, index) => (
              <Step key={index} label={step.label}></Step>
            ))}
        </Steps>
      </Flex>
    </>
  );
};

export default CheckOutStep;

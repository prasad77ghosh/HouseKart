import React from "react";
import { useSteps } from "chakra-ui-steps";
import { useRef } from "react";
import { Text, useToast } from "@chakra-ui/react";
import CheckOutStep from "../ExtraComponents/CheckOutStep";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlineVpnKey } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import "./Payment.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import http from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("order_info"));
  const { nextStep, activeStep } = useSteps({
    initialStep: 2,
  });
  const { ShippingInfo, CartItems } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.AuthReducer);
  const toast = useToast();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  //api calling
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const { data } = await http.post("/payment/process", paymentData);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: ShippingInfo.address,
              city: ShippingInfo.city,
              state: ShippingInfo.state,
              postal_code: ShippingInfo.pinCode,
              country: ShippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast({
          title: result.error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          navigate("/success");
        } else {
          toast({
            title: "There is some issues while processing payment.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } catch (error) {}
  };
  return (
    <>
      <CheckOutStep activeStep={activeStep} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Text color="white">Card Info</Text>
          <div>
            <BsCreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <BsCalendarEvent />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <MdOutlineVpnKey />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;

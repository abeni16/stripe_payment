import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTION = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica,sans-serif',
      fontSize: "16px",
      "::placeholder": {
        color: "#fa755a",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  },
};
const CardInput = () => {
  return <CardElement options={CARD_ELEMENT_OPTION} />;
};

export default CardInput;

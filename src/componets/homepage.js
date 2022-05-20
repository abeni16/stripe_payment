import React, { useState } from "react";
// MUI Components
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// Util imports
import axios from "axios";

import CardInput from "./cardInput";
function HomePage() {
  // State
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handelSubmitPay = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const res = await axios.post("http://localhost:5000/pay", {
      email: email,
    });

    const clientSecret = res.data["client_secret"];
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });
    if (result.error) {
      console.log("error");
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("money sent");
      }
    }
  };

  const handelSubmitSub = async (event) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });
    if (result.error) {
      console.log(result.error + "error");
    } else {
      const res = await axios.post("http://localhost:5000/sub", {
        payment_method: result.paymentMethod.id,
        email: email,
      });

      const { client_secret, status } = res.data;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then((result) => {
          if (result.error) {
            console.log("error");
          } else {
            console.log("you got the money in the bank cheers");
          }
        });
      } else {
        console.log("this is not real code");
      }
    }
  };
  return (
    <Card sx={{ width: 275, height: 225 }}>
      <CardContent>
        <TextField
          label="Email"
          id="outlined-email-input"
          helperText={`Email you'll recive updates and receipts on`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        >
          email
        </TextField>
        <CardInput />
        <div>
          <Button variant="contained" color="primary" onClick={handelSubmitPay}>
            Pay
          </Button>
          <Button variant="contained" color="primary" onClick={handelSubmitSub}>
            Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default HomePage;

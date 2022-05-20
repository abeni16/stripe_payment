import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import HomePage from "./componets/homepage";

// Styles

const stripePromise = loadStripe(
  "pk_test_51KZt0mGYU4xyMzE4UnV4OM9X55xOHoO2itS45TASf1tNLIP1ekIfrtI14qZeH1WhbTBzyBoaRbFXv7cG6MAbbYS700AfNzh8ya"
);

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <HomePage />
      </Elements>
    </>
  );
}

export default App;

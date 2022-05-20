const express = require("express");
const stripe = require("stripe")(
  "sk_test_51KZt0mGYU4xyMzE4nLIFRhsJ4W1oGAgs2eEYaO73M3cDsw4t0Ijjn6iGxfWytWaxXvtqfwYBh6rdGDl4pZfe4QbL00DsfVl7qS"
);
const app = express();
const cors = require("cors");
const port = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/pay", async (req, res) => {
  const { email } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });

  res.json({ client_secret: paymentIntent["client_secret"] });
});

app.post("/sub", async (req, res) => {
  const { email, payment_method } = req.body;
  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: "price_1L141pGYU4xyMzE42tflAzPS" }],
    expand: ["latest_invoice.payment_intent"],
  });

  const status = subscription["latest_invoice"]["payment_intent"]["status"];
  const client_secret =
    subscription["latest_invoice"]["payment_intent"]["client_secret"];

  res.json({ client_secret: client_secret, status: status });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

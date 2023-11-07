const express = require("express");
const braintree = require("braintree")
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  let nonce = req.query.nonce
  gateway.paymentMethod.create({
    customerId: "54321",
    paymentMethodNonce: nonce
  }).then(result => {
    if(!result.success){
      res.sendStatus(400)
    }
    else if(result.success) {
      console.log(result.paymentMethod.token)
      res.sendStatus(200)
    }
  });
});

const server = app.listen(port, () => console.log(`Payfast app listening on port: ${port}!`));
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "p6ggcchfz6npvf7d",
  publicKey: "tys5jkdnq9bn6wj7",
  privateKey: "8784f5dd23a8967d36a7e0575e8f034a"
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
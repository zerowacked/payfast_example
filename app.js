const express = require("express");
const braintree = require("braintree")
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  gateway.paymentMethod.create({
    customerId: "54321",
    paymentMethodNonce: req.query.nonce
  }).then(result => {
    if(!result.success){
      res.sendStatus(400)
    }
    else if(result.success) {
      console.log(result.paymentMethod.token);
      dataString.payment_method_token = result.paymentMethod.token;
      console.log(dataString);
      fetch(url, configuration).then((response) => {
        if(!response) {
          console.log(response)
          res.sendStatus(400)
        }
        else if (response) {
          console.log(response)
          res.sendStatus(200)
        }
      });
    }
  });
});

const randomVariable = "Ignore this var"
const server = app.listen(port, () => console.log(`Payfast app listening on port: ${port}!`));
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "p6ggcchfz6npvf7d",
  publicKey: "tys5jkdnq9bn6wj7",
  privateKey: "8784f5dd23a8967d36a7e0575e8f034a"
});
let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic dHlzNWprZG5xOWJuNndqNzo4Nzg0ZjVkZDIzYTg5NjdkMzZhN2UwNTc1ZThmMDM0YQ=='
};

let dataString = {
    "merchant_id": "p6ggcchfz6npvf7d",
    "url": "https://api.stripe.com/v1/charges",
    "method": "POST",
    "payment_method_token": "2bsk84fv",
    "tokenize_on_forward": true,
    "sensitive_data": {"user": "Bearer sk_test_51MWijuAQ6FTJw6THGwN9rwM4F28bHUxoJS068OEW1Q4zqFgu1cNorT3DZ9XPqBt7rZaPCR8C0r1gJL7Q2jtkVN2M00dAKcgStk"},
    "data": { "amount": "4001" },
    "config": {
      "name": "payfast_stripe",
      "methods": ["POST"],
      "url": "^https:\/\/api.stripe.com/v1/charges$",
      "request_format": { "/body": "urlencode" },
      "types": ["NetworkTokenizedCard"],
      "transformations": [
        {"path": "/body/amount", "value": "$amount"},
        {"path": "/body/source[object]", "value": "card"},
        {"path": "/body/source[number]", "value": "$number" },
        {"path": "/body/source[exp_month]", "value": "$expiration_month"},
        {"path": "/body/source[exp_year]", "value": "$expiration_year"},
        {"path": "/body/currency", "value": "usd"},
        {"path": "/body/description", "value": "Definitely spontaneous testing"},
        {"path": "/header/Authorization", "value": "$user"},
        {"path": "/header/Content-Type", "value": "application/x-www-form-urlencoded"}
      ]
    }
};

let url = "https://forwarding.sandbox.braintreegateway.com/"

let configuration = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(dataString),
  json: true
};

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

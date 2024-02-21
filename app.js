const express = require("express");
const braintree = require("braintree")
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3001;

app.use(cors())

app.get("/", (req, res) => {
  /* BEGIN BRAINTREE CUSTOMER CREATE CALL */
  gateway.customer.create({
    paymentMethodNonce: req.query.nonce
  }).then(result => {
    if(!result.success){
      res.sendStatus(400)
    }
    else if(result.success) { /* IF BRAINTREE TOKEN IS SUCCESSFULLY GENERATED, CREATE PAYFAST REQUEST */
      let dataString = {
          "merchant_id": "d9y5s6dfpbzc8qj6",
          "url": "https://api.stripe.com/v1/charges",
          "method": "POST",
          "payment_method_token": result.customer.paymentMethods[0].token,
          "tokenize_on_forward": true,
          "sensitive_data": {"user": "Bearer sk_test_51MWijuAQ6FTJw6THGwN9rwM4F28bHUxoJS068OEW1Q4zqFgu1cNorT3DZ9XPqBt7rZaPCR8C0r1gJL7Q2jtkVN2M00dAKcgStk"},
          "data": { "amount": req.query.amount, "message": req.query.message },
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
              {"path": "/body/description", "value": "$message"},
              {"path": "/header/Authorization", "value": "$user"},
              {"path": "/header/Content-Type", "value": "application/x-www-form-urlencoded"}
            ]
          }
      };
      
      let configuration = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(dataString),
        json: true
      };

      fetch(url, configuration).then((response) => {
        if(!response) {
          res.sendStatus(400)
        }
        else if (response) {
          res.sendStatus(200)
        }
      });
    }
  });
});

const server = app.listen(port, () => console.log(`Payfast app listening on port: ${port}!`));
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "d9y5s6dfpbzc8qj6",
  publicKey: "2djf9yztjxt9249x",
  privateKey: "dac0f48790720e67b915603f01840194"
});
let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ZGFjMGY0ODc5MDcyMGU2N2I5MTU2MDNmMDE4NDAxOTQ6MmRqZjl5enRqeHQ5MjQ5eA=='
};
let url = "https://forwarding.sandbox.braintreegateway.com/"

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

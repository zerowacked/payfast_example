# README

This is an example Payfast endpoint for PayPal/Braintree solutions to be able to deploy on Render Web Services. It is a direct clone of their Node Express "Hello World" repo. All business logic required occurs within app.js. It is not a verbose example and should only be used as an endpoint which is deployed to generate a stored PayPal token and send that token to your preferred payment service provider.

The app in this repo is deployed at [https://express.onrender.com](https://express.onrender.com).

## Deployment

See https://render.com/docs/deploy-node-express-app or follow the steps below:

Create a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`

That's it! Your web service will be live on your Render URL as soon as the build finishes.

import express, { Router } from 'express';
import StripeCheckoutController from '../controllers/checkoutController';

const checkoutInstance = new StripeCheckoutController();

const checkoutRouter: Router = express.Router();
// checkout
checkoutRouter.post(
  '/create-checkout-session ',
  checkoutInstance.createStripeCheckout
);

export default checkoutRouter;

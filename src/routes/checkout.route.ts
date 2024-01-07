import express, { Router } from 'express';
import { stripeCheckoutController } from '../controllers/checkoutController';

const checkoutInstance = new stripeCheckoutController();
const checkoutRouter: Router = express.Router();
// checkout
checkoutRouter.post(
  '/create-checkout-session ',
  checkoutInstance.createCheckoutSession
);

export default checkoutRouter;

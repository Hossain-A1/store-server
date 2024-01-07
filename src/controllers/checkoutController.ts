// controllers/checkoutController.ts

import { Request, Response } from 'express';
import stripe from 'stripe';
import { productType } from '../types/product.type';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripeClient = new stripe(stripeSecretKey as string);

if (!stripeClient) {
  console.log('Secret key not found.');
}

export class stripeCheckoutController {
  constructor() {}
  public async createCheckoutSession(
    req: Request,
    res: Response
  ): Promise<void> {
    const items: productType[] = req.body.items;

    try {
      // Create a line item array for the session
      const lineItems = items.map((item: productType) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.count,
      }));

      // Create a checkout session
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).send('Error creating checkout session');
    }
  }
}

export default new stripeCheckoutController();

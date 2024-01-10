import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(stripeSecretKey);

export default class StripeCheckoutController {
  constructor() {}

  public async createStripeCheckout(req: Request, res: Response) {
    try {
      const { items } = req.body;
      
      const transformedItems = items.map((item: any) => ({
        quantity: item.count,
        price_data: {
          currency: 'USD',
          unit_amount: +(item.price * 100).toFixed(2),
          product_data: {
            name: item.title,
            images: [item.images[0]],
          },
        },
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: transformedItems,
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error in createStripeCheckout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

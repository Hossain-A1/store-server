"use strict";
// controllers/checkoutController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeCheckoutController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeClient = new stripe_1.default(stripeSecretKey);
if (!stripeClient) {
    console.log('Secret key not found.');
}
class stripeCheckoutController {
    constructor() { }
    async createCheckoutSession(req, res) {
        const items = req.body.items;
        try {
            // Create a line item array for the session
            const lineItems = items.map((item) => ({
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
        }
        catch (error) {
            console.error('Error creating checkout session:', error);
            res.status(500).send('Error creating checkout session');
        }
    }
}
exports.stripeCheckoutController = stripeCheckoutController;
exports.default = new stripeCheckoutController();

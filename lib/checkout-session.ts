
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cartItems } = req.body;

      // Prepare line items for Stripe
      const lineItems = cartItems.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      }));

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

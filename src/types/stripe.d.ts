
declare global {
    interface Window {
      Stripe: (publishableKey: string) => Stripe.StripeStatic;
    }
  }
  
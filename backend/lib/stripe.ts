import Stripe from 'stripe';

// Easy to do the stripe config in a separate file like this so you can pass it where ever and not have to repeat the config
const stripeConfig = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});

export default stripeConfig;

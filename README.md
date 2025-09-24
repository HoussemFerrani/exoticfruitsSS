This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Demo Mode

The checkout pages currently use a **mock payment system** for demonstration purposes. When you click "Choisir" on any pricing plan:

1. You'll be taken to a payment form with realistic fields
2. The form includes automatic formatting for card numbers, expiry dates, and CVV
3. After submitting, you'll see a 2-second loading animation
4. You'll be redirected to a success page (or cancel page if you click "Annuler")

**To test the flow:**
- Visit the pricing section on your site
- Click "Choisir" on any plan (Sérénité, Compagnie, or Présence)
- Fill out the demo form (any valid-looking data works)
- Click the payment button to see the success flow
- Or click "Annuler" to see the cancel flow

## Stripe Setup (For Production)

When you're ready to accept real payments, follow these steps:

1. **Create a Stripe account** at [https://dashboard.stripe.com](https://dashboard.stripe.com)

2. **Get your API keys**:
   - Go to Developers → API keys
   - Copy your "Secret key" (starts with `sk_test_` for test mode)

3. **Create products and prices**:
   - Go to Products in your Stripe dashboard
   - Create three products for the pricing plans:
     - "Forfait Sérénité" - $120/month
     - "Forfait Compagnie" - $280/month
     - "Forfait Présence" - $360/month
   - For each product, create a recurring price (monthly subscription)

4. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_DOMAIN=http://localhost:3000
   NEXT_PUBLIC_STRIPE_SERENITE_PRICE_ID=price_...
   NEXT_PUBLIC_STRIPE_COMPAGNIE_PRICE_ID=price_...
   NEXT_PUBLIC_STRIPE_PRESENCE_PRICE_ID=price_...
   ```

5. **Test the checkout flow**:
   - Visit the pricing section on your site
   - Click "Choisir" on any plan
   - You'll be redirected to Stripe Checkout
   - Use test card numbers from [Stripe's testing guide](https://stripe.com/docs/testing)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

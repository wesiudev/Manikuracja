import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(
  "sk_test_51Qim85B1ANRdJriTQgpuz2sadWfqXwdH4TPD9fuyOp3aiNUVrFKwkgmBck1PkN1LwqPYH7IPrDMssUx27np7VssJ00GJHYCgg4"
);

export async function GET() {
  try {
    // Create a new Stripe customer
    const customer = await stripe.customers.create({
      email: "jenny.rosen@example.com", // Replace with a dynamic email from your application
      payment_method: "pm_card_visa", // Replace with a real payment method ID
      invoice_settings: {
        default_payment_method: "pm_card_visa",
      },
    });

    // Add the subscription for the customer
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: "price_1QimeQB1ANRdJriTgSfjHzje", // Replace with your actual price ID from Stripe
        },
      ],
    });

    // Suggested data to save to your database:
    // - `customer.id` (Stripe Customer ID): To link your application users to their Stripe account
    // - `subscription.id` (Stripe Subscription ID): To track their subscription status
    // - Additional metadata, such as email or customer name, for internal reference
    // Saving this data ensures you can manage subscriptions, track payments, and update user access based on their subscription status.

    // Example return response
    return NextResponse.json({
      success: true,
      message: "Customer created and subscription added successfully",
      customerId: customer.id,
      subscriptionId: subscription.id,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle and log any errors
    console.error("Error creating customer or subscription:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const { uid, email } = await req.json(); // Pass user details from frontend

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // Subscription mode
      payment_method_types: ["card"], // Accept card payments
      customer_email: email, // Pre-fill email for the user
      line_items: [
        {
          price: process.env.SUBSCRIPTION_PRICE, // Replace with your Stripe price ID
          quantity: 1,
        },
      ],
      metadata: { uid }, // Pass user ID to track progress
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    });

    // Optionally, save the session ID to track progress (e.g., save to your database with userId)

    return NextResponse.json({
      success: true,
      url: session.url, // Send the Checkout page URL back to the client
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating Stripe Checkout Session:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

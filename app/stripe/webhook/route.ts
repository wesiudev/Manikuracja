/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateUser } from "@/firebase";
import { fetchUser } from "@/utils/fetchUser";
import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const stripeSignature = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature,
      endpointSecret
    );
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({
      success: false,
      error: "Webhook signature verification failed",
    });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      const subscription = event.data.object;
      const uid = event.data.object.metadata.uid;
      const user = await fetchUser(uid);
      const userData = {
        ...user,
        subscriptionId: subscription.id,
        active: subscription.status === "active" ? true : false,
        customerId: subscription.customer,
        payments: user.payments
          ? [
              ...user.payments,
              {
                amount: subscription.plan.amount,
                date: Date.now(),
                result: subscription.status === "active" ? "paid" : "unpaid",
              },
            ]
          : [
              {
                amount: subscription.plan.amount,
                date: Date.now(),
                result: subscription.status === "active" ? "paid" : "unpaid",
              },
            ],
      };
      await updateUser(uid, userData);
      break;
    case "customer.subscription.deleted":
      const uid2 = event.data.object.metadata.uid;
      const user2 = await fetchUser(uid2);
      await updateUser(uid2, { ...user2, active: false });
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

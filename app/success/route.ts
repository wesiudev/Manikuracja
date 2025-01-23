import { updateUserSubscriptionData } from "@/firebase";
import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(
  "sk_test_51Qim85B1ANRdJriTQgpuz2sadWfqXwdH4TPD9fuyOp3aiNUVrFKwkgmBck1PkN1LwqPYH7IPrDMssUx27np7VssJ00GJHYCgg4"
);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({
      success: false,
      error: "No session_id provided",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const subscriptionId = session.subscription; // Subscription ID
    const customerId = session.customer; // Customer ID

    const paymentData = {
      amount: session.amount_total,
      date: Date.now(),
      result: session.payment_status,
    };

    await updateUserSubscriptionData(
      session.metadata.uid,
      subscriptionId,
      customerId,
      paymentData
    );

    return NextResponse.json({
      success: true,
      message: "Subscription successful",
      subscriptionId,
      customerId,
      session,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error retrieving session:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}

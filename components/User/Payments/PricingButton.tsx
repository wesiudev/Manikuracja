"use client";

import { setRegisterOpen } from "@/redux/slices/cta";
import { User } from "@/types";
import { useDispatch } from "react-redux";

export default function PricingButton({
  user,
  setPricingOpen,
}: {
  user: User;
  setPricingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const handleSubscribe = async () => {
    const response = await fetch("/stripe/subscription", {
      method: "POST",
      body: JSON.stringify({ uid: user?.uid, email: user?.email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      window.location.href = data.url; // Redirect to Stripe Checkout page
    } else {
      console.error(data.error);
    }
  };
  return (
    <div>
      {user?.uid ? (
        <button
          onClick={handleSubscribe}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Wykup subskrypcję
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch(setRegisterOpen(true));
            setPricingOpen(false);
          }}
          className="mt-6 w-full bg-pink-400 text-white py-2 px-4 rounded-lg hover:bg-pink-500 transition duration-300"
        >
          Zarejestruj się
        </button>
      )}
    </div>
  );
}

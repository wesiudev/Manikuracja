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
          disabled={user?.active}
          className={`disabled:cursor-not-allowed mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 disabled:bg-gray-200 disabled:text-gray-400`}
        >
          {user?.active ? "Subskrybcja aktywna" : "Wykup subskrypcję"}
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
      {user?.active && (
        <button
          onClick={async () => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_URL}/stripe/customer-portal`,
              {
                method: "POST",
                body: JSON.stringify({ uid: user?.uid }),
                headers: { "Content-Type": "application/json" },
              }
            );
            const data = await response.json();
            if (data.success) {
              window.location.href = data.url; // Redirect to Stripe Customer Portal
            } else {
              console.error(data.error);
            }
          }}
          className="w-max mx-auto text-sm text-gray-500 mt-2 block text-center"
        >
          Wyłącz subskrybcję
        </button>
      )}
    </div>
  );
}

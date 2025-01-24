"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      const { session_id } = router.query;

      if (!session_id) {
        setErrorMessage("Missing session ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/stripe/success?session_id=${session_id}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (data.success) {
          setSuccessMessage("Your subscription was successful!");
        } else {
          setErrorMessage(
            data.error || "An error occurred during the subscription process."
          );
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchSessionData();
    }
  }, [router.isReady, router.query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-red-500">Nie udało się!</h1>
          <p className="text-lg text-gray-600">
            Nie pobralismy środków z Twojego konta
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-green-500">
          Transakcja przebiegła pomyślnie!
        </h1>
        <p className="text-lg text-gray-600">
          Wróć do strony głównej aby dokończyć konfigurację profilu.
        </p>
        <Link href="/">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Strona główna
          </a>
        </Link>
      </div>
    </div>
  );
}

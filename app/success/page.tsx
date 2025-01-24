// pages/success.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
        const response = await fetch(`/api/success?session_id=${session_id}`, {
          method: "GET",
        });

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
      <div>
        <h1>Subscription Failed</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Subscription Successful</h1>
      <p>{successMessage}</p>
      <Link href="/">Strona główna</Link>
    </div>
  );
}

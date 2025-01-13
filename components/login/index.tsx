"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, getDocument } from "@/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleButton";
import { FaKey } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { errorCatcher } from "@/utils/errorCatcher";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isThinking, setThinking] = useState(false);
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
    passwordRepeat: "",
    email: "",
  });
  function signIn() {
    setThinking(true);
    const id = toast.loading(<span>Loguję...</span>, {
      position: "top-right",
      isLoading: true,
    });

    (async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then(() => {
          toast.update(id, {
            render: "Zalogowano pomyślnie!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setThinking(false);
          router.push("/user");
        });
      } catch (err) {
        const errorMsg = errorCatcher(err);
        toast.update(id, {
          render: errorMsg,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setThinking(false);
      }
    })();
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && !loading) {
      getDocument("users", user?.uid)
        .then((data) => {
          dispatch(setUser(data));
        })
        .then(() => {
          router.push("/user");
        });
    }
  }, [loading, user]);
  return (
    <div className="rounded-t-xl w-[88vw] sm:w-[50vw] p-6 2xl:px-12 bg-white">
      <h2
        className={`text-black py-3 pr-3 font-bold text-2xl lg:text-3xl drop-shadow-xl shadow-black mb-6 flex flex-row items-center font-gotham`}
      >
        Zaloguj się na swoje konto
      </h2>
      <div className="grid grid-cols-1 gap-3 h-max">
        <div className="flex flex-col">
          {" "}
          <label
            htmlFor="email"
            className="font-gotham text-black  font-light text-lg"
          >
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            placeholder="Wpisz email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="input-lg bg-white text-black  p-3 text-lg mb-3 font-gotham font-light"
          />
        </div>
        <div className="flex flex-col">
          {" "}
          <label
            htmlFor="password"
            className="font-gotham text-black  font-light text-lg"
          >
            Hasło
          </label>
          <input
            required
            type="password"
            placeholder="Wpisz hasło"
            id="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="input-lg bg-white text-black  p-3 text-lg mb-3 font-gotham font-light"
          />
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 gap-3 w-full">
        <button
          disabled={isThinking}
          onClick={signIn}
          className="mt-2 py-3.5  disabled:bg-gray-600 bg-[#126b91] hover:bg-opacity-80 duration-150 text-white font-bold"
        >
          {!isThinking && (
            <div className="flex flex-row items-center justify-center">
              <FaKey className="mr-2" /> Zaloguj się
            </div>
          )}
          {isThinking && "Poczekaj..."}
        </button>
        <div className="font-gotham my-6 flex flex-row items-center justify-center">
          <div className="h-px w-full bg-[#126b91]"></div>
          <div className="px-12">lub</div>
          <div className="h-px w-full bg-[#126b91]"></div>
        </div>
        <GoogleAuthButton />
        <div className="my-2 font-gotham text-black  font-light text-lg">
          Nie posiadasz jeszcze konta?{" "}
          <Link
            href="/register"
            className="text-[#126b91] underline hover:no-underline"
          >
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
}

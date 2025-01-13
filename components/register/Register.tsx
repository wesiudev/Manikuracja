"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { addDocument, auth, getDocument } from "@/firebase";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CreateAccountForm from "./CreateAccountForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { errorCatcher } from "@/utils/errorCatcher";
export default function Register() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    email: "",
  });

  const [isLoading, setLoading] = useState(false);
  function createAccount() {
    setLoading(true);
    const id = toast.loading(<span>Sekundarnie...</span>, {
      position: "top-right",
      isLoading: true,
    });

    if (userData.password !== userData.repeatPassword) {
      setLoading(false);
      toast.update(id, {
        render: "Hasła nie są takie same",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    if (userData.password?.length < 6) {
      setLoading(false);
      toast.update(id, {
        render: "Hasło powinno składać się z minimum 6 znaków",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    if (!userData.email) {
      setLoading(false);
      toast.update(id, {
        render: "Prosimy wpisać email",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    (async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((userCredential) => {
          addDocument("users", userCredential.user?.uid, {
            leads: [],
            city: "",
            description: "",
            title: "",
            pseudo: "",
            uid: userCredential.user?.uid,
            name: "",
            email: userData.email,
            photoURL: "",
            emailVerified: false,
            profileComments: [],
            projects: [],
            history: [
              {
                action: `Zapraszamy do konfiguracji profilu!`,
                creationTime: Date.now(),
              },
            ],
          });

          toast.update(id, {
            render: "Konto utworzone pomyślnie!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          router.push("/user");
          setLoading(false);
        });
      } catch (err) {
        const errorMsg = errorCatcher(err);
        toast.update(id, {
          render: errorMsg,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setLoading(false);
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
        className={`text-black text-left font-bold text-2xl xl:text-3xl drop-shadow-xl shadow-black mb-6`}
      >
        Zarejestruj się
      </h2>
      <CreateAccountForm
        userData={userData}
        setUserData={setUserData}
        createAccount={createAccount}
        loading={isLoading}
      />
      <div className="w-full flex flex-col justify-center items-center mt-12">
        <button
          disabled
          className="rounded-md cursor-not-allowed !bg-[#E3ECF0] !text-zinc-400 !font-normal py-2 px-4"
        >
          Zarejestruj się
        </button>
        <div className="flex flex-row items-center flex-wrap mt-8 font-gotham text-black  font-light text-lg">
          Posiadasz już konto?{" "}
          <Link
            className="ml-2 text-[#126b91] underline hover:no-underline"
            href="/login"
          >
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  );
}

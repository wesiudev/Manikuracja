"use client";
import googleLogo from "../../public/googleLogo.webp";
import React from "react";
import { createUser, provider } from "@/firebase";
import { getAuth, UserCredential, signInWithPopup } from "firebase/auth";
import { errorCatcher } from "@/utils/errorCatcher";
import { setRegisterOpen } from "@/redux/slices/cta";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { setUser } from "@/redux/slices/user";
import { fetchUser } from "@/utils/fetchUser";
export default function GoogleAuthButton({
  setNavOpen,
  setRegisterModalOpen,
  setLoginModalOpen,
}: {
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  async function googleHandler() {
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user }: UserCredential = await result;
      const existingUser = await fetchUser(user?.uid);
      if (existingUser.error) {
        await createUser({
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          description: "",
          logo: "",

          seek: false,
          emailVerified: false,
          configured: false,
          active: false,
          profileComments: [],

          services: [],
          location: { lng: 21.0122287, lat: 52.2296756, address: "" },
          phoneNumber: "",
        });
      } else {
        dispatch(setUser(existingUser));
        setNavOpen(true);
        setRegisterModalOpen(false);
        setLoginModalOpen(false);
        dispatch(setRegisterOpen(false));
      }
    } catch (error) {
      errorCatcher(error);
    }
    setNavOpen(true);
    setRegisterModalOpen(false);
    setLoginModalOpen(false);
    dispatch(setRegisterOpen(false));
  }
  return (
    <div className="google-button-container">
      <button
        onClick={() => googleHandler()}
        type="button"
        className={`block bg-white hover:bg-gray-100 focus:bg-gray-100 mx-auto rounded-lg text-black font-semibold px-4 py-3 border border-gray-300`}
      >
        <div className="flex items-center justify-center">
          <Image
            src={googleLogo}
            width={124}
            height={124}
            alt="Google Logo"
            className="w-7 h-7"
          />
          <span className="ml-4 block">Zaloguj z Google</span>
        </div>
      </button>
    </div>
  );
}

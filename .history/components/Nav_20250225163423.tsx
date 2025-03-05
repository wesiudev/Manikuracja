"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser, initialState } from "@/redux/slices/user";
import logo from "../public/logo.png";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    signOut(auth);
    dispatch(setUser(initialState.user));
  };

  return (
    <>
      <header className="bg-blue-400 shadow-md w-full fixed top-0 left-0 z-[150]">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className=" font-archivo text-3xl text-white">
            MANIKURACJA
          </Link>

          <nav className="flex gap-6 text-white">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            {user?.uid ? (
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/login")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <div className="h-[72px]"></div>
    </>
  );
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser, initialState } from "@/redux/slices/user";
import DownloadApp from "./Navigation/DownloadApp";

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
      <header className="shadow-md font-archivo w-full">
        <div
          style={{ boxShadow: "inset 0px 0px 12px #000" }}
          className="bg-blue-400 p-4"
        >
          <Link
            href="/"
            className="text-center text-xl sm:text-3xl text-white block"
          >
            MANIKURACJA
          </Link>
        </div>
        <nav className="text-white fixed bottom-0 left-0 bg-blue-400 w-full p-4 z-50">
          <DownloadApp />
          <div className="my-3 space-x-3">
            <Link href="/blog">Blog</Link>
            {user?.uid ? (
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700"
              >
                Wyloguj
              </button>
            ) : (
              <button className="text-white hover:text-blue-300">
                Zaloguj
              </button>
            )}
          </div>
        </nav>
      </header>
      <div className="h-[72px]"></div>
    </>
  );
}

"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser, initialState } from "@/redux/slices/user";
import DownloadApp from "./Navigation/DownloadApp";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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
          <div className="my-3 space-x-3">
            <DownloadApp />
            <Link href="/blog" className="hover:text-blue-300">
              BLOG
            </Link>
            {user?.uid ? (
              <button onClick={logout} className="hover:text-blue-300">
                WYLOGUJ
              </button>
            ) : (
              <button className=" hover:text-blue-300">ZALOGUJ</button>
            )}
          </div>
        </nav>
      </header>
      <div className="h-[72px]"></div>
    </>
  );
}

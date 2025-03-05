"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser, initialState } from "@/redux/slices/user";
import DownloadApp from "./Navigation/DownloadApp";
import { useEffect, useState } from "react";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [scrolledBottom, setScrolledBottom] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (currentScrollY > lastScrollY) {
      setScrolledBottom(bottom);
    } else {
      setScrolledBottom(!bottom);
    }
    setLastScrollY(currentScrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        <nav
          className={`text-white fixed bottom-0 left-0 bg-blue-400 max-h-[60px] w-full p-4 z-50 ${
            scrolledBottom ? "translate-y-0" : "translate-y-[300px]"
          } duration-300`}
        >
          <div className="my-3 space-x-3 flex items-center justify-center -translate-y-1/2">
            <Link href="/blog" className="hover:text-blue-300">
              BLOG
            </Link>
            <DownloadApp />
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
    </>
  );
}

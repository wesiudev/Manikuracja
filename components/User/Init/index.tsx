"use client";
import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { fetchUser } from "@/utils/fetchUser";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

export default function InitUser() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAndSetUser = async () => {
      if (user) {
        const res = await fetchUser(user.uid);
        dispatch(setUser(res));
      }
    };
    fetchAndSetUser();
  }, [user, loading]);

  return <div></div>;
}

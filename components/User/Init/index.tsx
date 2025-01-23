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
    if (user) {
      fetchUser(user?.uid).then((res) => {
        dispatch(setUser(res));
      });
    }
  }, [user, loading]);

  return <div></div>;
}

"use client";
import { setRegisterOpen } from "@/redux/slices/cta";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function CtaRegisterButton() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <button
      className={`bg-green-600 hover:bg-green-500 text-white px-[1rem] py-[0.5rem] rounded-md ${
        user?.uid === "" ? "block" : "hidden"
      }`}
      onClick={() => dispatch(setRegisterOpen(true))}
    >
      Utwórz profil
    </button>
  );
}

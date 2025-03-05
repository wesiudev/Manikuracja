"use client";

import { useState } from "react";

export default function SpecialistsButton() {
  const [isAccountCreatorOpen, setIsAccountCreatorOpen] = useState(false);
  return (
    <>
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 ${
          isAccountCreatorOpen ? "-translate-y-0" : "-translate-y-[150vh]"
        } h-3/4 w-[90%] sm:w-3/4 bg-white transition-transform duration-300 z-[101] rounded-b-xl`}
      ></div>
      <button
        onClick={() => setIsAccountCreatorOpen(!isAccountCreatorOpen)}
        className="mt-8 w-max mx-auto max-w-full block px-6 py-1.5 border border-white text-white"
      >
        DLA SPECJALISTEK
      </button>
    </>
  );
}

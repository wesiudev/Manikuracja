"use client";

import { useState } from "react";

export default function SpecialistsButton() {
  const [isAccountCreatorOpen, setIsAccountCreatorOpen] = useState();
  return (
    <>
      <div
        className={`fixed left-1/2 -translate-x-1/2 ${
          isAccountCreatorOpen ? "-translate-y-0" : "-translate-y-[100%]"
        } h-3/4 w-[90%] sm:w-3/4 bg-white z-50 transition-transform duration-300`}
      ></div>
      <button className="mt-8 w-max mx-auto max-w-full block px-6 py-1.5 border border-white text-white">
        DLA SPECJALISTEK
      </button>
    </>
  );
}

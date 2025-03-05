"use client";

import { useState } from "react";

export default function SpecialistsButton() {
  const [isAccountCreatorOpen, setIsAccountCreatorOpen] = useState();
  return (
    <>
      <div
        className={`fixed left-1/2 -translate-x-1/2 ${
          isAccountCreatorOpen ? "-translate-y-0" : "-translate-y-[100%]"
        }`}
      ></div>
      <button className="mt-8 w-max mx-auto max-w-full block px-6 py-1.5 border border-white text-white">
        DLA SPECJALISTEK
      </button>
    </>
  );
}

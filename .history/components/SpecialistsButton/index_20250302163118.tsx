"use client";

import { useState } from "react";

export default function SpecialistsButton() {
  const [isAccountCreatorOpen, setIsAccontCreatorOpen] = useState();
  return (
    <button className="mt-8 w-max mx-auto max-w-full block px-6 py-1.5 border border-white text-white">
      DLA SPECJALISTEK
    </button>
  );
}

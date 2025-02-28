/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";

function DownloadApp() {
  const [supportsPWA, setSupportsPWA] = useState<any>(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <div>
      <button
        className="text-xs bg-white text-black font-bold p-6 rounded-full flex items-center justify-center text-center flex-col"
        id="setup_button"
        aria-label="Install app"
        title="Install app"
        onClick={onClick}
      >
        <FaDownload className="text-2xl" />
        Pobierz <br /> Aplikację
      </button>
    </div>
  );
}
export default DownloadApp;

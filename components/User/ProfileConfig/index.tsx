import { useState } from "react";
import ChooseAccountType from "./ChooseAccountType";
import AccountLocation from "./AccountLocation";
import { User } from "@/types";
import AccountPresence from "./AccountPresence";
import AccountDisplay from "./AccountDisplay";

export default function ProfileConfig({
  setProfileConfigOpen,
  profileConfigOpen,
  user,
}: {
  setProfileConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileConfigOpen: boolean;
  user: User;
}) {
  const [step, setStep] = useState<number>(0);
  return (
    <div
      onClick={() => {
        setProfileConfigOpen(false);
      }}
      className={`bg-black/50 z-[92] fixed left-0 top-0 w-screen h-screen overflow-y-scroll flex  p-6 lg:p-12 xl:p-40 2xl:p-64 !py-6 lg:!py-12 xl:!py-24  ${
        profileConfigOpen && !user?.configured ? "block" : "hidden"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-max bg-white mx-auto max-w-[40rem] p-6 rounded-xl shadow-sm shadow-zinc-800"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Utwórz profil specjalisty
        </h2>
        <span className="text-xs text-gray-600 mt-1.5 block text-center">
          Krok {step + 1}
        </span>
        <span className="text-sm text-gray-600 block text-center">
          {step === 0 && "Wybierz rodzaj profilu"}
          {step === 1 && "Uzupełnij podstawowe informacje"}
          {step === 2 && "Prezentacja profilu"}
          {step === 3 && "Wyświetlanie profilu"}
        </span>
        <div className="">
          {step === 0 && (
            <ChooseAccountType
              setStep={setStep}
              setProfileConfigOpen={setProfileConfigOpen}
            />
          )}
          {step === 1 && <AccountLocation setStep={setStep} user={user} />}
          {step === 2 && <AccountPresence setStep={setStep} user={user} />}
          {step === 3 && <AccountDisplay setStep={setStep} user={user} />}
        </div>
      </div>{" "}
    </div>
  );
}

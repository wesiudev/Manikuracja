import { useState } from "react";
import ChooseAccountType from "./ChooseAccountType";
import AccountDetails from "./AccountDetails";
import { User } from "@/types";

export default function ProfileEdit({
  setProfileEditOpen,
  profileEditOpen,
  user,
}: {
  setProfileEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileEditOpen: boolean;
  user: User;
}) {
  const [step, setStep] = useState<number>(0);
  return (
    <div
      onClick={() => {
        setProfileEditOpen(false);
      }}
      className={`bg-black/50 z-[50] fixed left-0 top-0 w-screen h-full overflow-y-scroll p-6 lg:p-12 xl:p-40 2xl:p-64 !py-6 lg:!py-12 xl:!py-24  ${
        profileEditOpen ? "block" : "hidden"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-max bg-gray-200 mx-auto max-w-[40rem] p-6 rounded-xl shadow-sm shadow-zinc-800"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Utwórz profil specjalisty
        </h2>
        <div className="mt-3 sm:mt-6">
          {step === 0 && <ChooseAccountType setStep={setStep} />}
          {step === 1 && <AccountDetails setStep={setStep} user={user} />}
        </div>
      </div>
    </div>
  );
}

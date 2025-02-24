import { setUser } from "@/redux/slices/user";
import { User } from "@/types";
import { useDispatch } from "react-redux";
import Help from "../Help";
import { MapInput } from "./MapInput";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useMapConsts } from "@/utils/useMapConsts";
export default function AccountLocation({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const memoizedUser = useMemo(() => user, [user]);
  const dispatch = useDispatch();
  function handleState(key: string, value: string) {
    dispatch(setUser({ ...user, [key]: value }));
  }
  const { isLoaded, loadError } = useMapConsts();
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-lg">Nazwa</label>
      <Help text="Wpisz nazwę działalności, imię i nazwisko, lub wykaż się kreatywnością!" />
      <input
        type="text"
        value={user?.name}
        onChange={(e) => {
          handleState("name", e.target.value);
        }}
        className={`border-gray-300 border rounded-md p-2 mt-1`}
        placeholder="Jan Kowalski sp. z o.o."
      />
      <label className="font-semibold text-lg mt-3">Numer telefonu</label>
      <Help text="Wpisz numer telefonu, który wyświetli się w Twoim profilu." />
      <input
        type="text"
        value={user?.phoneNumber}
        onChange={(e) => {
          handleState("phoneNumber", e.target.value);
        }}
        className={`border-gray-300 border rounded-md p-2 mt-1`}
        placeholder="+48 123 456 789"
      />
      <label className="font-semibold text-lg mt-3">Lokalizacja</label>
      <Help text="Wskaż miejsce na mapie, aby klienci mogli Cię łatwiej znaleźć! Możesz wybrać dokładną lokalizację, lub wskazać miasto, w którym oferujesz usługi." />
      <MapInput user={memoizedUser} isLoaded={isLoaded} loadError={loadError} />
      <div className="flex items-center justify-center w-full">
        <button
          onClick={() => {
            setStep(0);
          }}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 mx-auto"
        >
          Powrót
        </button>
        <button
          onClick={() => {
            if (!user?.location?.address || !user?.name) {
              toast.error("Uzupełnij pola nazwy oraz miejsca.", {
                position: "top-center",
                draggable: true,
                autoClose: 5000,
              });
            } else {
              setStep(2);
            }
          }}
          className="w-max mx-auto px-[1.5rem] py-[0.6rem] bg-green-500 text-white rounded-md"
        >
          Dalej (3/4)
        </button>
      </div>
    </div>
  );
}

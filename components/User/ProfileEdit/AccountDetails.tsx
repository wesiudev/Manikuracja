import { setUser } from "@/redux/slices/user";
import { User } from "@/types";
import { useDispatch } from "react-redux";

export default function AccountDetails({
  setStep,
  user,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  user: User;
}) {
  const dispatch = useDispatch();
  function handleState(key: string, value: string) {
    dispatch(setUser({ ...user, [key]: value }));
  }
  return (
    <div className="flex flex-col">
      <label className="font-bold">Nazwa</label>
      <input
        type="text"
        value={user?.name}
        onChange={(e) => {
          handleState(e.target.value, "name");
        }}
        className={`border-gray-200 rounded-md p-2`}
        placeholder="imię/nazwa firmy"
      />
      <button
        onClick={() => {
          setStep(2);
        }}
        className="w-max mx-auto mt-4 px-[1.5rem] py-[0.6rem] bg-green-500 text-white rounded-md"
      >
        Zatwierdź
      </button>
    </div>
  );
}

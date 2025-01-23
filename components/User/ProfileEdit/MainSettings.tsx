import { setUser } from "@/redux/slices/user";
import { User } from "@/types";
import { useDispatch } from "react-redux";
import { MapInput } from "../ProfileConfig/AccountLocation/MapInput";
import { useMapConsts } from "@/utils/useMapConsts";
import { useMemo, useState } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
export default function MainSettings({ user }: { user: User }) {
  const memoizedUser = useMemo(() => user, [user]);
  const dispatch = useDispatch();
  function handleState(key: string, value: string) {
    dispatch(setUser({ ...user, [key]: value }));
  }
  const { isLoaded, loadError } = useMapConsts();
  const [loading, setLoading] = useState<boolean>(false);
  async function upload(file: File) {
    setLoading(true);
    const randId = uuidv4();
    const imageRef = ref(storage, randId);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    handleState("logo", url);
    setLoading(false);
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 mt-4 gap-3">
        <div className="flex flex-col">
          <label className="font-semibold sm:text-lg">Nazwa</label>
          <input
            type="text"
            value={user?.name}
            onChange={(e) => {
              handleState("name", e.target.value);
            }}
            className={`border-gray-300 border rounded-md p-2 mt-1`}
            placeholder="Jan Kowalski sp. z o.o."
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold sm:text-lg">Numer telefonu</label>
          <input
            type="text"
            value={user?.phoneNumber}
            onChange={(e) => {
              handleState("phoneNumber", e.target.value);
            }}
            className={`border-gray-300 border rounded-md p-2 mt-1`}
            placeholder="+48 123 456 789"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="font-semibold text-lg">Zdjęcie</label>
        <label htmlFor="uploader1" className="relative group block mt-2">
          {!user.logo && !loading ? (
            <div className="cursor-pointer w-full h-[120px] rounded-md hover:bg-blue-50 border border-gray-300 bg-white p-3 flex flex-col items-center justify-center">
              <FaImage className="text-3xl" />
              <h3 className="text-center mt-2 font-light text-sm">
                Dodaj zdjęcie
              </h3>
            </div>
          ) : (
            <div className="relative cursor-pointer max-w-36 max-h-36 aspect-square rounded-md border border-gray-300 bg-white p-3 flex items-center justify-center">
              {!loading && user?.logo && (
                <Image
                  src={user?.logo}
                  width={124}
                  height={124}
                  alt="Logo użytkownika"
                  className="absolute inset-0 object-cover w-auto max-h-[90%] mx-auto my-auto"
                />
              )}
              {loading && (
                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full border-b-2 border-gray-900 h-12 w-12"></div>
                </div>
              )}
            </div>
          )}
        </label>
      </div>
      <label className="font-semibold text-lg mt-3 block">Opis</label>
      <textarea
        value={user?.description}
        onChange={(e) => {
          handleState("description", e.target.value);
        }}
        className={`h-[120px] w-full border-gray-300 border rounded-md p-2 mt-2`}
        placeholder="Uzupełnij pole"
      />
      <div className="flex flex-col mt-3">
        <label className="font-semibold sm:text-lg">Lokalizacja</label>
        <MapInput
          user={memoizedUser}
          isLoaded={isLoaded}
          loadError={loadError}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files![0];
          if (!file) return;
          const validType = file.type.startsWith("image/");
          const validSize = file.size <= 5 * 1024 * 1024;
          if (!validType || !validSize) {
            toast.error(
              "Tylko zdjęcia o rozmiarze do 5MB są dozwolone (kwadratowe lub 16:9)",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
            return;
          }
          upload(file);
        }}
        id="uploader1"
        className="text-white hidden"
      />
      
    </div>
  );
}

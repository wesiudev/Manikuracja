import { IService, User } from "@/types";
import Help from "./Help";
import { useEffect, useState } from "react";
import { getServices } from "@/utils/getServices";
import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { updateUser } from "@/firebase";

export default function AccountDisplay({
  user,
  setStep,
}: {
  user: User;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [services, setServices] = useState<{
    pedicure: IService[];
    manicure: IService[];
  }>({
    pedicure: [],
    manicure: [],
  });
  const [loading, setLoading] = useState(true);
  const [pedicureOpen, setPedicureOpen] = useState(false);
  const [manicureOpen, setManicureOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      getServices().then((res) => {
        const updatedServices = {
          manicure: [] as IService[],
          pedicure: [] as IService[],
        };
        res.forEach((service: IService) => {
          if (service.flatten_name.includes("manicure"))
            updatedServices.manicure.push(service);
          else updatedServices.pedicure.push(service);
        });
        setServices(updatedServices);
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <div>
      {/* Label and Help */}
      <div>
        <label className="font-semibold text-lg">Zakładki</label>
        <Help text="Wybierz, w których wynikach wyszukiwania chcesz się pojawiać (możesz wybrać wiele)." />
      </div>

      {/* Pedicure Services */}
      <button
        onClick={() => setPedicureOpen(!pedicureOpen)}
        className={`border-2 rounded-md h-full w-full text-sm p-4 mt-2 ${
          pedicureOpen
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-white text-gray-600 hover:bg-gray-100 border-gray-400"
        }`}
      >
        Usługi pedicure
      </button>
      {pedicureOpen && (
        <div className="mt-2 p-3 flex flex-col gap-2 max-h-[300px] overflow-y-auto bg-gray-50 rounded-md border border-gray-100">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            services?.pedicure?.map((item) => (
              <button
                key={item.flatten_name}
                onClick={() =>
                  dispatch(
                    setUser({
                      ...user,
                      services: user?.services?.some(
                        (s) => s.flatten_name === item.flatten_name
                      )
                        ? user?.services?.filter(
                            (service) =>
                              service.flatten_name !== item.flatten_name
                          )
                        : [...user.services, item],
                    })
                  )
                }
                className={`${
                  user?.services?.some(
                    (s) => s.flatten_name === item.flatten_name
                  )
                    ? "bg-green-500 text-white font-bold"
                    : "bg-white hover:bg-gray-100 border-gray-400 text-zinc-800"
                } text-sm p-2 rounded-md border-2 border-gray-300`}
              >
                {item.real_name}
              </button>
            ))
          )}
        </div>
      )}

      {/* Manicure Services */}
      <button
        onClick={() => setManicureOpen(!manicureOpen)}
        className={`border-2 rounded-md h-full w-full text-sm p-4 mt-4 ${
          manicureOpen
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-white text-gray-600 hover:bg-gray-100 border-gray-400"
        }`}
      >
        Usługi manicure
      </button>
      {manicureOpen && (
        <div className="mt-2 p-3 flex flex-col gap-2 max-h-[300px] overflow-y-auto bg-gray-50 rounded-md border border-gray-200">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            services?.manicure?.map((item) => (
              <button
                key={item.flatten_name}
                onClick={() =>
                  dispatch(
                    setUser({
                      ...user,
                      services: user?.services?.some(
                        (s) => s.flatten_name === item.flatten_name
                      )
                        ? user.services.filter(
                            (service) =>
                              service.flatten_name !== item.flatten_name
                          )
                        : [...user.services, item],
                    })
                  )
                }
                className={`${
                  user?.services?.some(
                    (s) => s.flatten_name === item.flatten_name
                  )
                    ? "bg-green-500 text-white font-bold"
                    : "bg-white hover:bg-gray-100 text-zinc-800"
                } text-sm p-2 rounded-md border border-gray-300`}
              >
                {item.real_name}
              </button>
            ))
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 mx-auto"
        >
          Powrót
        </button>
        <button
          onClick={() => {
            updateUser(user.uid, { ...user, configured: true });
            dispatch(setUser({ ...user, configured: true }));
          }}
          className="mx-auto px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Zapisz zmiany
        </button>
      </div>
    </div>
  );
}

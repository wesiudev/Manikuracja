/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GoogleAuthButton from "@/components/GoogleButton";
export default function CreateAccountForm({
  createAccount,
  setUserData,
  userData,
  loading,
}: {
  createAccount: any;
  setUserData: any;
  userData: any;
  loading: boolean;
}) {
  return (
    <div>
      <div className="flex flex-col">
        {" "}
        <label htmlFor="email" className="font-light text-lg text-black ">
          Email
        </label>
        <input
          required
          type="email"
          id="email"
          placeholder="Wpisz email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="input-lg  bg-white p-3 font-light text-lg text-black "
        />
        <div className="flex flex-col space-y-3 w-full">
          <div className="flex flex-col w-full">
            {" "}
            <label
              htmlFor="password"
              className="font-light text-lg text-black "
            >
              Hasło
            </label>
            <input
              required
              type="password"
              placeholder="Wpisz hasło"
              id="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="input-lg  bg-white text-black  p-3 text-xl font-light"
            />
          </div>
          <div className="flex flex-col w-full">
            {" "}
            <label
              htmlFor="password"
              className="font-light text-lg text-black "
            >
              Powtórz hasło
            </label>
            <input
              required
              type="password"
              placeholder="Powtórz hasło"
              id="repeatPassword"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
              className="input-lg  bg-white text-black  p-3 text-xl font-light"
            />
          </div>
        </div>
      </div>{" "}
      <button
        disabled={loading}
        onClick={() => {
          createAccount();
        }}
        className="w-full mt-3 py-3.5 disabled:bg-gray-600 bg-[#126b91] hover:bg-opacity-80 duration-150 text-white"
      >
        {!loading && (
          <div className="flex flex-row items-center justify-center">
            Utwórz konto
          </div>
        )}
        {loading && "Chwila..."}
      </button>
      <div className="my-6 flex flex-row items-center justify-center">
        <div className="h-px w-full bg-[#126b91]"></div>
        <div className="px-12 font-gotham text-gray-600">lub</div>
        <div className="h-px w-full bg-[#126b91]"></div>
      </div>
      <GoogleAuthButton />
    </div>
  );
}

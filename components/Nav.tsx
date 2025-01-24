"use client";
import loginImage from "../public/loginImage.png";
import Link from "next/link";
import logo from "../public/logo.png";
import { FaBook, FaChevronDown, FaCog, FaHome, FaTag } from "react-icons/fa";
import { useState } from "react";
import {
  FaChevronLeft,
  FaDollarSign,
  FaPowerOff,
  FaUser,
} from "react-icons/fa6";
import Image from "next/image";
import Login from "./User/Login";
import Register from "./User/Register/Register";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import InitUser from "./User/Init";
import { useRouter } from "next/navigation";
import ProfileConfig from "./User/ProfileConfig";
import { initialState, setUser } from "@/redux/slices/user";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Pricing from "./User/Payments/Pricing";
import ProfileEdit from "./User/ProfileEdit";
import Services from "./User/Services";
export default function Nav() {
  const { user } = useSelector((state: RootState) => state.user);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isNavOpen, setNavOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [profileConfigOpen, setProfileConfigOpen] = useState<boolean>(false);
  const [profileEditOpen, setProfileEditOpen] = useState<boolean>(false);
  const router = useRouter();
  const [pricingOpen, setPricingOpen] = useState<boolean>(false);
  const [servicesOpen, setServicesOpen] = useState<boolean>(false);

  const navItems = [
    {
      title: "Przegląd",
      action: () => {
        setExpandedItems([]);
        router.push("/");
      },
      icon: <FaHome />,
    },
    {
      title: user?.uid !== "" ? "Mój profil" : "Dla specjalistów",
      expandable: true,
      icon: <FaUser />,
      subItems: [
        {
          title: "Ustawienia",
          action: () => {
            if (user?.uid === "") {
              setRegisterModalOpen(true);
            } else if (user?.uid !== "" && !user?.configured) {
              setProfileConfigOpen(true);
            } else if (user?.uid !== "" && user?.configured) {
              setProfileEditOpen(!profileEditOpen);
            }
          },
          icon: <FaCog />,
        },
        {
          title: "Premium",
          action: () => {
            setPricingOpen(!pricingOpen);
          },
          icon: <FaDollarSign />,
        },
        {
          title: "Usługi",
          action: () => {
            if (user?.uid === "") {
              setRegisterModalOpen(true);
            } else if (user?.uid !== "" && !user?.configured) {
              setProfileConfigOpen(true);
            } else if (user?.uid !== "" && user?.configured) {
              setServicesOpen(!servicesOpen);
            }
          },
          icon: <FaTag />,
        },
      ],
    },
  ];
  const dispatch = useDispatch();
  function logout() {
    dispatch(setUser(initialState.user));
    signOut(auth);
  }
  const { register } = useSelector((state: RootState) => state.cta);
  return (
    <>
      <InitUser />
      {profileConfigOpen && user?.uid !== "" && (
        <ProfileConfig
          profileConfigOpen={profileConfigOpen}
          setProfileConfigOpen={setProfileConfigOpen}
          user={user}
        />
      )}
      {profileEditOpen && user?.uid !== "" && user?.configured && (
        <ProfileEdit
          profileEditOpen={profileEditOpen}
          setProfileEditOpen={setProfileEditOpen}
          setPricingOpen={setPricingOpen}
          setServicesOpen={setServicesOpen}
          user={user}
        />
      )}
      <Login
        loginModalOpen={loginModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        setLoginModalOpen={setLoginModalOpen}
        setNavOpen={setNavOpen}
        setProfileConfigOpen={setProfileConfigOpen}
      />
      <Register
        registerModalOpen={registerModalOpen || register}
        setRegisterModalOpen={setRegisterModalOpen}
        setLoginModalOpen={setLoginModalOpen}
        setNavOpen={setNavOpen}
        setProfileConfigOpen={setProfileConfigOpen}
      />
      <Pricing
        user={user}
        setPricingOpen={setPricingOpen}
        pricingOpen={pricingOpen}
      />
      <Services
        user={user}
        setServicesOpen={setServicesOpen}
        servicesOpen={servicesOpen}
        setProfileEditOpen={setProfileEditOpen}
      />
      <div className="h-full">
        {isNavOpen && (
          <div
            onClick={() => setNavOpen(false)}
            className="lg:hidden fixed left-0 top-0 w-full h-full bg-black/50 z-[10]"
          ></div>
        )}
        <div
          className={`z-[70] text-gray-800 bg-white pt-6 h-full fixed left-0 scrollbar ${
            isNavOpen
              ? "translate-x-[0] duration-300"
              : "-translate-x-[300px] lg:-translate-x-0 duration-300"
          }`}
        >
          <button
            onClick={() => setNavOpen(!isNavOpen)}
            className="lg:hidden absolute -right-[56px] w-[56px] h-[56px] bottom-12 bg-pink-400 rounded-r-lg duration-200 text-white flex items-center justify-center"
          >
            <FaChevronLeft
              className={`lg:hidden text-xl ${
                isNavOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
          <div className="relative flex flex-col gap-12 h-full overflow-y-auto">
            <Image
              src={loginImage}
              alt="Manicure Login/Register"
              className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-20 w-[145px] lg:w-[200px] select-none mb-2"
              priority
            />
            <div
              className={`relative flex flex-col justify-between h-full w-[300px] lg:rounded-lg`}
            >
              <div>
                <Link
                  href="/"
                  className="text-lg font-sans font-bold flex flex-row items-center py-2 px-6 rounded-br-3xl lg:rounded-tl-lg w-max max-w-full"
                >
                  <div className="">
                    <Image src={logo} alt="Manikuracja logo" className="" />
                  </div>
                </Link>

                <div className="h-full mt-4">
                  <div className="flex flex-col flex-wrap justify-between w-full">
                    {navItems.map((item, index) => (
                      <div key={index} className={`w-full`}>
                        <button
                          onClick={() => {
                            if (item.expandable) {
                              if (expandedItems.includes(index as never)) {
                                setExpandedItems(
                                  expandedItems.filter((i) => i !== index)
                                );
                              } else {
                                setExpandedItems([
                                  ...expandedItems,
                                  index as never,
                                ]);
                              }
                            } else {
                              setNavOpen(!isNavOpen);
                            }
                            if (index === 0) {
                              item.action!();
                            }
                          }}
                          className={`border-transparent ${
                            expandedItems.includes(index as never)
                              ? "bg-gray-300 hover:bg-gray-200"
                              : "hover:bg-gray-300"
                          } duration-150 flex items-center justify-between py-[1rem] px-6 w-full`}
                        >
                          <div className="flex flex-row items-center">
                            <div className="mr-2">{item.icon}</div>
                            {item.title}
                          </div>
                          {item.expandable && (
                            <div
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (item.expandable) {
                                  if (expandedItems.includes(index as never)) {
                                    setExpandedItems(
                                      expandedItems.filter((i) => i !== index)
                                    );
                                  } else {
                                    setExpandedItems([
                                      ...expandedItems,
                                      index as never,
                                    ]);
                                  }
                                }
                              }}
                              className={`rounded-md p-1`}
                            >
                              <FaChevronDown
                                className={`duration-150 ${
                                  expandedItems.includes(index as never)
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              />
                            </div>
                          )}
                        </button>

                        {item.expandable &&
                          expandedItems.includes(index as never) && (
                            <div
                              className={`py-2 px-4 w-full gap-2 flex flex-col`}
                            >
                              {item.subItems.map((subItem, subIndex) => (
                                <div key={subIndex}>
                                  <button
                                    onClick={() => {
                                      subItem.action();
                                      setNavOpen(!isNavOpen);
                                    }}
                                    className={`hover:bg-gray-300 flex items-center py-2 px-4 w-full rounded-md`}
                                  >
                                    {subItem.icon}
                                    <div className="ml-2">{subItem.title}</div>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        router.push("/blog");
                      }}
                      className={`hover:bg-gray-300 border-transparent duration-150 flex items-center justify-between py-[1rem] px-6 w-full`}
                    >
                      <div className="flex flex-row items-center">
                        <div className="mr-2">
                          <FaBook />
                        </div>
                        Blog
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              {user?.uid !== "" && (
                <button
                  onClick={() => {
                    logout();
                    setNavOpen(!isNavOpen);
                  }}
                  className={`justify-center mt-2 hover:bg-gray-300 flex items-center py-[1rem] px-6 w-full`}
                >
                  <FaPowerOff className="mr-2 opacity-40 mt-px" />
                  Wyloguj
                </button>
              )}
              {user?.uid === "" && (
                <div className="sticky bottom-0 grid grid-cols-2 gap-3 px-6 pb-6 bg-white">
                  <button
                    onClick={() => {
                      setNavOpen(!isNavOpen);
                      setRegisterModalOpen(true);
                    }}
                    className={`rounded-md text-white text-sm relative justify-center flex items-center py-[0.65rem] duration-150 w-full hover:bg-green-500 bg-green-600`}
                  >
                    Utwórz konto
                  </button>
                  <button
                    onClick={() => {
                      setNavOpen(!isNavOpen);
                      setLoginModalOpen(true);
                    }}
                    className={`rounded-md text-white text-sm relative justify-center flex items-center py-[0.65rem] duration-150 w-full hover:bg-[#FF5F8F]/65 bg-[#FF5F8F]/85`}
                  >
                    Zaloguj się
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

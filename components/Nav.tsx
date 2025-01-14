"use client";
import Link from "next/link";
import logo from "../public/logo.png";
import { FaChevronDown, FaHome, FaPlusCircle, FaTag } from "react-icons/fa";
import { useState } from "react";
import { FaBriefcase, FaChevronLeft, FaList } from "react-icons/fa6";
import Image from "next/image";
import Login from "./User/Login";
import Register from "./User/Register/Register";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import InitUser from "./User/Init";
export default function Nav() {
  const { user } = useSelector((state: RootState) => state.user);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isNavOpen, setNavOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const navItems = [
    { title: "Przegląd", action: () => console.log("ok"), icon: <FaHome /> },
    {
      title: "Profil",
      action: () => console.log("ok"),
      expandable: true,
      icon: <FaBriefcase />,
      subItems: [
        {
          title: "Edytuj profil",
          action: () => console.log("ok"),
          icon: <FaPlusCircle />,
        },
        {
          title: "Moje ogłoszenia",
          action: () => console.log("ok"),
          icon: <FaList />,
        },
      ],
    },
    {
      expandable: true,
      title: "Usługi",
      action: () => console.log("ok"),
      icon: <FaTag />,
      subItems: [
        {
          title: "Dodaj usługę",
          action: () => console.log("ok"),
          icon: <FaPlusCircle />,
        },
        {
          title: "Moje usługi",
          action: () => console.log("ok"),
          icon: <FaList />,
        },
      ],
    },
  ];
  return (
    <>
      <InitUser />
      {loginModalOpen && (
        <Login
          loginModalOpen={loginModalOpen}
          setRegisterModalOpen={setRegisterModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}
      {registerModalOpen && (
        <Register
          registerModalOpen={registerModalOpen}
          setRegisterModalOpen={setRegisterModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}
      <div className="h-full">
        {isNavOpen && (
          <div className="lg:hidden fixed left-0 top-0 w-full h-full bg-black/50 z-[10]"></div>
        )}
        <div
          className={`z-[10] text-gray-800 bg-white shadow-md shadow-black pt-6 h-full fixed right-0 scrollbar ${
            isNavOpen
              ? "translate-x-[0] duration-300"
              : "translate-x-[300px] lg:-translate-x-0 duration-300"
          }`}
        >
          <div className="relative flex flex-col gap-12 h-full">
            <button
              onClick={() => setNavOpen(!isNavOpen)}
              className="lg:hidden absolute -left-[56px] w-[56px] h-[56px] top-3 bg-pink-400 rounded-l-lg duration-200 text-white flex items-center justify-center"
            >
              <FaChevronLeft
                className={`lg:hidden text-xl ${
                  isNavOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
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
                              item.action();
                              setNavOpen(!isNavOpen);
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
                  </div>
                </div>
              </div>
              {user.uid === "" && (
                <div className="grid grid-cols-2 gap-3 px-6 pb-6">
                  <button
                    onClick={() => {
                      setNavOpen(!isNavOpen);
                      setRegisterModalOpen(true);
                    }}
                    className={`rounded-md text-white text-sm relative justify-center flex items-center py-[0.65rem] duration-150 w-full hover:bg-[#FF5F8F]/65 bg-[#FF5F8F]/85`}
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
              {user.uid !== "" && <div className="mb-24">{user.email}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

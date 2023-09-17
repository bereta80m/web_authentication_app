"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { GrGroup } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { UseGlobal } from "../context/GlobalContext";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { UseDialog } from "../context/DialogContext";

function Header() {
  const { current_User } = UseGlobal();
  const {HandleCloseDrop,isDropOpen, setIsDropOpen} = UseDialog()
  const router = useRouter();

  useEffect(() => {
    const HandleClickOutside = (e) => {
      if (isDropOpen && e.target.classList.contains("OutsideofDrop")) {
        HandleCloseDrop();
      }
    };
    window.addEventListener("click", HandleClickOutside);
    return () => {
      window.removeEventListener("click", HandleClickOutside);
    };
  }, [isDropOpen, HandleCloseDrop]);

  return (
    <header className="fixed lg:px-20 md:px-20 sm:px-16 xs:px-12 xxs:px-8 w-full z-20">
      <div className="flex relative justify-between w-full py-5 items-center OutsideofDrop">
        <div className="bg-devchallenges w-44 h-5 bg-no-repeat OutsideofDrop" />
        <div
          onClick={() => setIsDropOpen(!isDropOpen)}
          className="flex  items-center cursor-pointer gap-3 -space-x-1 overflow-hidden">
          <Image
            src={current_User?.image}
            className={`inline-block h-10 w-10 object-contain rounded-2xl  ring-2 ring-white`}
            alt="No image"
            width={44}
            height={44}
          />
          <p className="lg:flex md:flex sm:hidden xs:hidden xxs:hidden">
            {current_User?.name}
          </p>
          {isDropOpen ? (
            <IoMdArrowDropdown
              className={`text-2xl lg:flex md:flex sm:hidden xs:hidden xxs:hidden`}
            />
          ) : (
            <IoMdArrowDropup
              className={`text-2xl lg:flex md:flex sm:hidden xs:hidden xxs:hidden`}
            />
          )}
        </div>
        {isDropOpen && (
          <ul className="flex flex-col z-30 absolute right-0 mt-[250px] bg-white border shadow-lg rounded-xl w-[200px]  py-3 px-2   ">
            <li className="flex gap-3 items-center cursor-pointer hover:bg-[#f2f2f2] py-3 rounded-xl px-2">
              <CgProfile className="text-2xl" />
              <p>My Profile</p>
            </li>
            <li
              onClick={() => signIn("github")}
              className="flex gap-3 items-center hover:bg-[#f2f2f2] cursor-pointer py-3 rounded-xl px-2"
            >
              <GrGroup className="text-2xl" />
              <p>Group Chat</p>
            </li>
            <li
              className="flex gap-3 items-center border-t cursor-pointer hover:bg-[#f2f2f2] py-3 rounded-xl pt-3 px-2"
              onClick={() => signOut()}
            >
              <BiLogOut className="text-2xl text-red-500" />
              <p className="text-red-500">Logout</p>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;


"use client"
import Header from "./Header";
import Image from "next/image";
import {BiSolidBadgeCheck} from "react-icons/bi"
import EditarProfile from "./EditarProfile";
import { UseGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import { UseDialog } from "../context/DialogContext";


function Profile({session}) {
  const {current_User, setCurrent_User,getUserById,UpdateImage} = UseGlobal()
  const { setOpenDialog } = UseDialog()
  useEffect(() => {
    const GetUser = async () => {
      if (session) {
        const emailID = `${session.user.email}`;
        const response = await fetch("/api/GetUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailID }),
        });
        const data = await response.json();
        setCurrent_User(data.user);
      }
    };
    GetUser();
  }, []);

    return (
    <div className="w-full h-screen">
      <Header current_User={current_User}/>
      <div className="flex flex-col py-20 lg:px-20 OutsideofDrop w-full h-screen">
        <div className="flex flex-col items-center OutsideofDrop  w-full pb-10">
          <p className="text-2xl font-semibold OutsideofDrop">Personal Info</p>
          <p className="text-md OutsideofDrop">Basic info like your name and photo </p>
        </div>

        <div className="grid border  w-full rounded-xl relative OutsideofDrop ">
            <EditarProfile /> 

          <div className="flex items-center justify-between w-full lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5  h-20 border-b OutsideofDrop">
            <div className="flex flex-col">
              <p className="text-xl font-semibold">Profile</p>
              <p  className="text-black/50  lg:text-lg md:text-base sm:text-sm xs:text-sm xxs:text-sm  "> Some info may be visible to other people </p>
            </div>
            <button onClick={()=>setOpenDialog(true)} className="border px-14 rounded-xl py-2">Edit</button> 
          </div>

          <div className="flex items-center w-full lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5 py-3 h-20 border-b OutsideofDrop">
            <div  className="grid grid-cols-2 items-center w-full OutsideofDrop">
              <p className="text-xl font-semibold">Photo</p>
              <Image
                src={current_User?.image}
                alt=""
                width={400}
                height={400}
                className="w-16 h-16 object-contain border rounded-lg lg:justify-self-auto md:justify-self-auto sm:justify-self-auto xs:justify-self-end  xxs:justify-self-end OutsideofDrop"
              />
            </div>
          </div>

          <div className="flex items-center  w-full lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5  py-3 h-20 border-b OutsideofDrop">
            <div className="grid grid-cols-2 w-full items-center  OutsideofDrop">
              <p  className="text-xl font-semibold">Name</p>
              <p className="text-lg lg:justify-self-auto md:justify-self-auto sm:justify-self-auto xs:justify-self-end  xxs:justify-self-end">{current_User?.name}</p>
            </div>
          </div>

          <div className="flex items-center  w-full lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5 py-3 h-20 border-b OutsideofDrop">
            <div className="grid grid-cols-2  w-full items-center OutsideofDrop">
              <p className="text-xl font-semibold ">Bio</p>
              <p className="text-lg truncate">
                {current_User?.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center  w-full lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5  py-3 h-20 border-b OutsideofDrop">
            <div className="grid grid-cols-2 w-full items-center OutsideofDrop">
              <p className="text-xl font-semibold">Phone</p>
              <p className="text-lg lg:justify-self-auto md:justify-self-auto sm:justify-self-auto xs:justify-self-end  xxs:justify-self-end">{current_User?.phoneNumber} </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5  py-3 h-20 border-b OutsideofDrop">
            <div className="grid grid-cols-2 w-full items-center OutsideofDrop">
              <p className="text-xl font-semibold">Email</p>
              <p className="text-lg  lg:justify-self-auto md:justify-self-auto sm:justify-self-auto xs:justify-self-end  xxs:justify-self-end flex items-center gap-2">{current_User?.email}{true && <BiSolidBadgeCheck className="text-xl text-[#3897f1]" />}</p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5  py-3 h-20 OutsideofDrop">
            <div className="grid grid-cols-2 w-full items-center OutsideofDrop">
              <p className="text-xl font-semibold ">Password</p>
              <p className="text-lg lg:justify-self-auto md:justify-self-auto sm:justify-self-auto xs:justify-self-end  xxs:justify-self-end">................ </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;

/*

                    

*/

"use client";
import React, { useEffect, useRef, useState } from "react";
import { UseGlobal } from "../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import Confirm from "./Confirm";

import { UseDialog } from "../context/DialogContext";
import { Truculenta } from "next/font/google";


function EditarProfile({session}) {
  const {current_User,UpdateImage,myImage, setMyImage,newBio, setNewBio,newEmail, setNewEmail,myName, setMyName,newphoneNumber, setNewPhoneNumber,newPassword, setNewPassword} = UseGlobal();
  const {HandleCloseDialog,OpenDialog,setOpenConfirm, onFocus,setOnFocus } = UseDialog()

  return (
    <>
      {OpenDialog && (
        <div className="absolute w-full h-full rounded-xl OutsideofDrop z-10">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="relative w-full h-full bg-white rounded-xl  items-center  "
            >
              <Confirm />
              <div className="w-full h-full relative items-center">
                
                <div className="flex items-center justify-between w-full px-10 h-20 border-b OutsideofDrop ">
                  <div className="flex flex-col OutsideofDrop">
                    <p className="text-xl font-semibold">Change Info</p>
                    <p className="text-black/50 lg:text-lg md:text-base sm:text-sm xs:text-sm xxs:text-sm ">
                      Changes will be reflected to every services
                    </p>
                  </div>
                  <div className="flex items-center px-5 gap-5">
                  <button  onClick={()=>setOpenConfirm(true)} className={`${!true ? 'bg-gray-500': 'bg-[#3897f1]' } px-3 text-white rounded-xl truncate py-2 mr-5`}>
                    Change Info
                  </button>
                  <GrClose onClick={()=>HandleCloseDialog()} className=" cursor-pointer  text-3xl text-[#fff] " />

                  </div>
                </div>

                <div className="flex items-center w-full px-10 py-3 h-20 border-b OutsideofDrop">
                  <div className="grid grid-cols-2 items-center w-full OutsideofDrop">
                    <p className="text-xl font-semibold">Photo</p>
                    <div className="ImageChange flex items-center gap-4   OutsideofDrop">
                      <label htmlFor="myimagefile" className="flex cursor-pointer relative w-14 h-14 rounded-md OutsideofDrop">
                        <Image
                          src={myImage || current_User?.image}
                          width={400}
                          height={400}
                          alt="No image"
                          className="w-14 object-contain h-14 rounded-md"
                        />
                        <div className="flex items-center OutsideofDrop justify-center absolute rounded-md bg-black/20 w-full h-full">
                          <AiFillCamera className="text-white/80" />
                        </div>
                      </label>
                      <label htmlFor="changeURL" onClick={()=>setOnFocus(true)}  className={`text-black/50  lg:text-base md:text-sm sm:text-sm xs:text-sm xxs:text-sm `}>
                        CHANGE PHOTO
                      </label>
                      <input type="text" id="changeURL" value={myImage || current_User.image} onChange={(e)=>setMyImage(e.target.value) } onBlur={()=>setOnFocus(false)} onFocus={()=>setOnFocus(true)}  style={{display:onFocus ? '': `none`}} placeholder="Enter Url..."  className={` py-3 px-3 outline-none border rounded-xl`} />
                      <input onChange={(e)=>UpdateImage(e.target.files)} className="hidden" type="file" id="myimagefile" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center  w-full px-10 py-3 h-20 border-b OutsideofDrop">
                  <div className="grid grid-cols-2 w-full items-center  OutsideofDrop">
                    <p className="text-xl font-semibold">Name</p>
                    <div className="border py-2 rounded-lg px-3 truncate">
                      <input
                        type="text" 
                        name="name"
                        value={myName  || current_User?.name}
                        onChange={(e)=> setMyName(e.target.value)}
                        className="border-none outline-none  bg-transparent"
                        placeholder="Enter your name..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center  w-full px-10 py-3 h-20 border-b OutsideofDrop">
                  <div className="grid grid-cols-2  w-full items-center OutsideofDrop">
                    <p className="text-xl font-semibold ">Bio</p>
                    <div className="border py-2 rounded-lg px-3 truncate">
                      <input
                        type="text"
                        className="border-none outline-none bg-transparent"
                        name="bio"
                        value={newBio  || current_User?.bio}
                        onChange={(e)=> setNewBio(e.target.value)}

                        placeholder="Enter your Bio..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full px-10 py-3 h-20 border-b OutsideofDrop">
                  <div className="grid grid-cols-2 w-full items-center OutsideofDrop">
                    <p className="text-xl font-semibold">Phone</p>
                    <div className="border py-2 rounded-lg px-3 truncate">
                      <input
                        type="text"
                        name="phoneNumber"
                        value={newphoneNumber  || current_User?.phoneNumber}
                        onChange={(e)=> setNewPhoneNumber(e.target.value)}
     
                        className="border-none outline-none bg-transparent"
                        placeholder="Enter your phone ..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full px-10 py-3 h-20 border-b OutsideofDrop">
                  <div className="grid grid-cols-2 w-full items-center OutsideofDrop">
                    <p className="text-xl font-semibold">Email</p>
                    <div className="border py-2 rounded-lg px-3 truncate">
                      <input
                        type="text"
                        name="email"
                        value={newEmail  || current_User?.email}
                        onChange={(e)=> setNewEmail(e.target.value)}
                        className="border-none outline-none bg-transparent"
                        placeholder="Enter your Email..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full px-10 py-3 h-20 OutsideofDrop">
                  <div className="grid grid-cols-2 w-full  items-center OutsideofDrop">
                    <p className="text-xl font-semibold">Password</p>
                    <div className="border py-2 rounded-lg px-3 truncate">
                      <input
                        type="text"
                        name="password"
                        value={newPassword}
                        onChange={(e)=> setNewPassword(e.target.value)}
                        className="border-none outline-none truncate  bg-transparent"
                        placeholder="Enter your Password..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default EditarProfile;


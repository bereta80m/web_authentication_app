"use client";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import {VscSymbolNamespace} from "react-icons/vsc"
import Link from "next/link";
import { signIn } from 'next-auth/react'
import Switch from "../components/Switch";
import { UseDialog } from "../context/DialogContext";


function Registerpage() {
  const {isOnMode}= UseDialog()
  
    const [registerValues, setRegisterValues] = useState({
      name:"",
      username:"",
      email:"",
      password:"",
    })
  
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    const isValidPassword = (password) => {
      // Al menos 8 caracteres, letras mayúsculas, minúsculas, números y caracteres especiales
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
      return passwordRegex.test(password);
    };
    
    const HandleSubmit = async(e) => {
      e.preventDefault()
      const name = registerValues.name
      const username =registerValues.email.split('@')[0]
      const email = registerValues.email
      const passwordkey = registerValues.password
   
      try {
          const res = await fetch('api/register', {
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify({username, email,name, passwordkey})
          })
  
          console.log(await res.json())
          if (res.ok) {
            setTimeout(async() => {
             await signIn()
          }, 1500)
          }
  
      } catch (error) {
          console.log(error)
      }
    }
  return (
    <div
      className={`grid place-items-center w-full h-screen ${
        isOnMode && "bg-[#252329]"
      }`}
    >
      <div className="flex flex-col gap-5  shadow-sm border rounded-2xl z-10 lg:px-10 md:px-10 sm:px-8 xs:px-5 xxs:px-5 lg:py-8 md:py-8 xs:py-5 xxs:py-5 min-h-[550px]  min-w-[400px] max-w-[400px] ">
        <div className="flex w-full items-center justify-between">
          <div
            className={`${
              isOnMode ? "bg-devchallengesWhite" : "bg-devchallenges"
            } w-44 h-5 bg-no-repeat`}
          />
          <Switch />
        </div>
        <div className="flex flex-col gap-5 w-full ">
          <p
            className={`text-lg font-semibold ${
              isOnMode ? "text-white" : "text-black"
            }  `}
          >
            Join thousands of learners from around the world
          </p>
          <p className={`  ${isOnMode ? "text-white" : "text-black"} `}>
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <form onSubmit={HandleSubmit}  className="grid w-full gap-4">
          <div className="flex gap-2 items-center border py-2 px-2 rounded-md ">
            <VscSymbolNamespace
              className={`text-2xl ${
                isOnMode ? "text-white/50" : "text-black/50"
              }`}
            />
            <input
              type="text"
              placeholder="Name"
              required
              value={registerValues.name}
              onChange={(e)=>setRegisterValues((prev)=> ({...prev,[e.target.name]:e.target.value}))}
              name="name"
              className={`bg-transparent outline-none border-none ${
                isOnMode ? "text-white/50" : "text-black"
              }`}
            />
          </div>
          <div className="flex gap-2 items-center border py-2 px-2 rounded-md ">
            <MdEmail
              className={`text-2xl ${
                isOnMode ? "text-white/50" : "text-black/50"
              }`}
            />
            <input
              type="email"
              name="email"
              required
              value={registerValues.email}
              onChange={(e)=>setRegisterValues((prev)=> ({...prev,[e.target.name]:e.target.value}))}
              placeholder="Email"
              className={`bg-transparent outline-none border-none ${
                isOnMode ? "text-white/50" : "text-black"
              }`}
            />
          </div>
          <div className="flex gap-2 items-center border py-2 px-2 rounded-md  ">
            <BiLock
              className={`text-2xl ${
                isOnMode ? "text-white/50" : "text-black/50"
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={registerValues.password}
              onChange={(e)=>setRegisterValues((prev)=> ({...prev,[e.target.name]:e.target.value}))}
              name="password"
              className={`bg-transparent outline-none border-none ${
                isOnMode ? "text-white/50" : "text-black"
              }`}
            />
          </div>
          <button onClick={(e)=>HandleSubmit(e)} className="bg-[#2f80ed] text-white py-2 rounded-md">
            Start coding now
          </button>
        </form>
        <div className="flex items-center pt-5 gap-5 flex-col w-full">
          <p className={`${isOnMode ? "text-white/50" : "text-black/50"} `}>
            Or continue with these social profile{" "}
          </p>
          <div className="flex justify-center gap-3 pt-3  w-full">
            <div onClick={()=>signIn("google",{callbackUrl:'/'})} className="bg-Google cursor-pointer bg-no-repeat border bg-contain rounded-full w-10 h-10"/>
            <div className="bg-Facebook bg-no-repeat border bg-contain rounded-full w-10 h-10" />
            <div className="bg-Twitter bg-no-repeat border bg-contain rounded-full w-10 h-10" />
            <div onClick={()=>signIn("github",{callbackUrl:'/'})} className="bg-Gihub cursor-pointer bg-no-repeat border bg-contain rounded-full w-10 h-10" />
          </div>
          <div
            className={`flex items-center gap-2 text-xs ${
              isOnMode ? "text-white/50" : "text-black/50"
            }`}
          >
            Already a member?
            <Link href={`/Login`} className="text-[#2d9cdb]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;


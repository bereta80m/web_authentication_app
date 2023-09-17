"use client";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Switch from "../components/Switch";
import { UseDialog } from "../context/DialogContext";
import { toast } from 'react-toastify';

function Loginpage() {
  const {isOnMode} = UseDialog()
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const HandleLogin = async (e) => {
    e.preventDefault();
    const email = loginValues.email;
    const password = loginValues.password;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error == null) {
        router.push("/");
        notifySuccess("Login successfully");
      } else {
        console.log("Error occured while logging");
        notifyError("Error occured while logging");
      }
    } catch (error) {
      console.log(error);
      notifyError("Error occured while logging");
    }
  };

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
            className={`text-md font-semibold ${
              isOnMode ? "text-white" : "text-black"
            } `}
          >
            Login
          </p>
        </div>
        <form onSubmit={HandleLogin} className="grid w-full gap-4">
          <div className="flex gap-2 items-center border py-2 px-2 rounded-md ">
            <MdEmail
              className={`text-2xl ${isOnMode ? "text-white/50" : "text-black/50"}`}
            />
            <input
              name="email"
              type="email"
              value={loginValues.email}
              onChange={(e)=>setLoginValues((prev)=> ({...prev,[e.target.name]:e.target.value}))}
              placeholder="Email"
              className={`bg-transparent outline-none border-none ${
                isOnMode ? "text-white/50" : "text-black"
              }`}
            />
          </div>
          <div className="flex gap-2 items-center border py-2 px-2 rounded-md  ">
            <BiLock
              className={`text-2xl ${isOnMode ? "text-white/50" : "text-black/50"}`}
            />
            <input
              name="password"
              type="password"
              onChange={(e)=>setLoginValues((prev)=> ({...prev,[e.target.name]:e.target.value}))}
              value={loginValues.password}
              placeholder="Password"
              className={`bg-transparent outline-none border-none ${
                isOnMode ? "text-white/50" : "text-black"
              }`}
            />
          </div>
          <button onClick={(e)=>HandleLogin(e)} className="bg-[#2f80ed] text-white py-2 rounded-md">
            Start coding now
          </button>
        </form>
        <div className="flex items-center pt-5 gap-5 flex-col w-full">
          <p className={`${isOnMode ? "text-white/50" : "text-black/50"} `}>
            Or continue with these social profile{" "}
          </p>
          <div className="flex justify-center gap-3 pt-3  w-full">
            <div onClick={()=>signIn("google",{callbackUrl:'/'})} className="bg-Google cursor-pointer bg-no-repeat border bg-contain rounded-full w-10 h-10" />
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
            <Link href={`/Register`} className="text-[#2d9cdb]">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;

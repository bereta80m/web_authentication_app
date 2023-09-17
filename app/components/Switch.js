"use client"
import React,{useEffect, useState} from 'react'
import {BsFillMoonFill,BsFillSunFill} from "react-icons/bs"
import { UseDialog } from '../context/DialogContext'

function Switch() {
    const {isOnMode, setIsOnMode} = UseDialog()

  return (
    <>
    {isOnMode ? <BsFillMoonFill onClick={()=> setIsOnMode(false)}  className={`text-3xl cursor-pointer text-white/50`} /> : <BsFillSunFill onClick={()=> setIsOnMode(true)}  className={`text-3xl cursor-pointer`}/>}
    </>
  )
}

export default Switch
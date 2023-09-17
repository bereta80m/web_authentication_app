"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UseGlobal } from "../context/GlobalContext";
import { UseDialog } from "../context/DialogContext";



function Confirm() {
  const { HandleCloseConfim, openConfirm, HandleCloseDialog } = UseDialog();
  const {getUserById} = UseGlobal();

  const HandleChangeConfirm = ()=>{
    getUserById()
    HandleCloseConfim()
    HandleCloseDialog()
  }
  return (
    <>
      {openConfirm && (
        <AnimatePresence>
          <motion.div className="NotHere z-20 grid place-items-center rounded-xl absolute bg-black/50 w-full h-full">
            <div className="bg-white w-[30%] h-[50%] rounded-xl flex flex-col gap-5 justify-center items-center">
              <p className="font-medium">
                Are you sure you want to save the changes ?
              </p>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => HandleCloseConfim()}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => HandleChangeConfirm()}
                  className="bg-blue-500 text-white px-5 py-2 rounded-xl"
                >
                  confirm
                </button>
              </div>
            </div>
          </motion.div>
  
        </AnimatePresence>
      )}
    </>
  );
}

export default Confirm;

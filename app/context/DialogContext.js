"use client"
import { createContext,useContext, useState } from "react";

const DialogContext = createContext({})


function DialogProvider({children}) {
    const [OpenDialog, setOpenDialog] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isDropOpen, setIsDropOpen] = useState(false);
    const [isOnMode, setIsOnMode] = useState(false);
    const [onFocus,setOnFocus] = useState(false)
    const HandleCloseConfim = ()=>{
      if (openConfirm) {
        setOpenConfirm(false)
      }
  }
    const HandleCloseDialog = ()=>{
        if (OpenDialog) {
            setOpenDialog(false)
        }
    }
    const HandleCloseDrop = () => {
      if (isDropOpen) {
        setIsDropOpen(false);
      }
    };
  return (
    <DialogContext.Provider value={{onFocus,setOnFocus,isOnMode, setIsOnMode,HandleCloseDrop,isDropOpen, setIsDropOpen,HandleCloseDialog,OpenDialog,setOpenDialog,HandleCloseConfim,openConfirm, setOpenConfirm}}>
      {children}
    </DialogContext.Provider>
  )
}

export default DialogProvider
export const UseDialog = ()=> useContext(DialogContext)


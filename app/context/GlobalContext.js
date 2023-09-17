"use client";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { storage } from "../firebase/FireConfig";
import { toast } from 'react-toastify';


const GlobalContext = createContext({});

function GlobalProvider({ children }) {
  const [current_User, setCurrent_User] = useState(null);
  const [currentChanges, setCurrentChanges] = useState(null);
  const [myImage, setMyImage] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [myName, setMyName] = useState("");
  const [newphoneNumber, setNewPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const notifySuccess = (message) => toast.success(message);

  const UpdateImage = async (data) => {
    const uploadedFile = data[0];
    const storageRef = ref(storage, `files/${uploadedFile.name}`);
    await uploadBytes(storageRef, uploadedFile);
    const downloadURL = await getDownloadURL(storageRef);
    setMyImage(downloadURL);
    console.log(downloadURL);
  };

  async function getUserById() {
    if (current_User) {
      const { _id, bio, phoneNumber, name,image, email, password } = current_User;

      try {
        const response = await fetch("/api/UpdateUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id,
            name:myName || name,
            email: newEmail || email,
            bio: newBio || bio,
            phoneNumber: newphoneNumber || phoneNumber,
            image: myImage || image,
            password: newPassword || password,
          }),
        });
        if (response.ok) {
          setCurrentChanges({
            name:myName || name,
            email: newEmail || email,
            bio: newBio || bio,
            phoneNumber: newphoneNumber || phoneNumber,
            image: myImage || image,
            password: newPassword || password,});
        }
        //const response = await axios.put(`/api/GetUser`, { bio:'Hello world', phoneNumber:'8095421597' });
        console.log("response client:", response.data); // Assuming the server sends a response with updated user data
        notifySuccess("Changes saved successfully")
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    }
  }
  useEffect(() => {
    setCurrent_User((prev) => ({ ...prev, ...currentChanges }));
  }, [currentChanges]);

  return (
    <GlobalContext.Provider
      value={{
        myImage,
        setMyImage,
        current_User,
        UpdateImage,
        setCurrent_User,
        getUserById,
        newBio, setNewBio,newEmail, setNewEmail,myName, setMyName,newphoneNumber, setNewPhoneNumber,newPassword, setNewPassword
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

export const UseGlobal = () => useContext(GlobalContext);

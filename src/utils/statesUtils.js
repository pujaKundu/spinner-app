import { useState, useEffect } from "react";

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const useUserState = () => {
  const [discount, setDiscount] = useState(null);
  const [discountType, setDiscountType] = useState("%");
  const [color, setColor] = useState("#ffee99");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");

  return {
    discount,
    setDiscount,
    discountType,
    setDiscountType,
    color,
    setColor,
    name,
    setName,
    email,
    setEmail,
    selectedDiscount,
    setSelectedDiscount,
  };
};

export const useSpinnerState = () => {
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);

  return {
    isSpinnerOpen,
    setIsSpinnerOpen,
  };
};

export const useUserInformation = () => {
  const [userInformation, setUserInformation] = useState([
   {
    name:'tes',email:"tes@vfs.com",discount:'30',discountType:'fixed',selectedDiscount:"21",color:"#F0CF50"
   },
   {
    name:'tes',email:"tes@vfs.com",discount:'30',discountType:'fixed',selectedDiscount:"21",color:"#EE4040"
   },
   {
    name:'tes',email:"tes@vfs.com",discount:'30',discountType:'fixed',selectedDiscount:"21",color:"#815CD1"
   },
  ]);

  useEffect(() => {
    const loadedUserInformation = loadFromLocalStorage("userInformation");
    if (loadedUserInformation) {
      setUserInformation(loadedUserInformation);
    }
  }, []); 

  const addUserInformation = (newUserInfo) => {
    setUserInformation((prevUserInformation) => [
      ...prevUserInformation,
      newUserInfo,
    ]);
  };

  useEffect(() => {
    saveToLocalStorage("userInformation", userInformation);
  }, [userInformation]);

  return {
    userInformation,
    addUserInformation
  };
};

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
      name:'tes',email:"tes1@vfs.com",discount:'30',discountType:'fixed',selectedDiscount:"41",color:"#f5f763"
     },
     {
      name:'tes',email:"tes2@vfs.com",discount:'20',discountType:'%',selectedDiscount:"21",color:"#f79452"
     },
     {
      name:'tes',email:"tes3@vfs.com",discount:'50',discountType:'fixed',selectedDiscount:"53",color:"#48f0ea"
     },
     {
      name:'tes',email:"tes4@vfs.com",discount:'10',discountType:'%',selectedDiscount:"30",color:"#F0C050"
     },
     {
      name:'tes',email:"tes5@vfs.com",discount:'55',discountType:'%',selectedDiscount:"20",color:"#de77f2"
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


  return {
    userInformation,
    addUserInformation
  };
};

export const useSpinnerDetailState = () => {
  const [discount, setDiscount] = useState(null);
  const [discountType, setDiscountType] = useState("%");
  const [color, setColor] = useState("#ffee99");

  return {
    discount,
    setDiscount,
    discountType,
    setDiscountType,
    color,
    setColor,
  };
};

export const useSpinnerInformation = () => {
  const [spinnerInformation, setSpinnerInformation] = useState([
    {
      discount:'25',discountType:"fixed",color:"#f5f763"
     },
     {
      discount:'15',discountType:"%",color:"#f79452"
     },
     {
      discount:'90',discountType:"fixed",color:"#48f0ea"
     },
     {
      discount:'44',discountType:"%",color:"#F0C050"
     },
     {
      discount:'10',discountType:"%",color:"#de77f2"
     }
   
  ]);

  useEffect(() => {
    const loadedSpinnerInformation = loadFromLocalStorage("spinnerInformation");
    if (loadedSpinnerInformation) {
      setSpinnerInformation(loadedSpinnerInformation);
    }
  }, []); 

  useEffect(() => {
    const loadedSpinnerInformation = loadFromLocalStorage("spinnerInformation");
    if (loadedSpinnerInformation) {
      setSpinnerInformation(loadedSpinnerInformation);
    }
  }, []); 

  const addSpinnerInformation = (newSpinnerInfo) => {
    setSpinnerInformation((prevSpinnerInformation) => [
      ...prevSpinnerInformation,
      newSpinnerInfo,
    ]);
  };


  return {
    spinnerInformation,
    addSpinnerInformation
  };
};
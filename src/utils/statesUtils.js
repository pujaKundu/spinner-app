import { useState, useEffect } from "react";

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const useUserState = () => {
  const [type, setType] = useState("%");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");

  return {
    type,
    setType,
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

    saveToLocalStorage("userInformation", [...userInformation, newUserInfo]);
  };

  

  return {
    userInformation,
    addUserInformation
  };
};

export const useSpinnerDetailState = () => {
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("%");
  const [color, setColor] = useState("#ffee99");
  const [duration,setDuration]=useState(3000)

  return {
    discount,
    setDiscount,
    discountType,
    setDiscountType,
    color,
    setColor,
    duration,setDuration
  };
};

export const useSpinnerInformation = () => {
  const [spinnerInformation, setSpinnerInformation] = useState([
    {
      discount:'25',discountType:"fixed",color:"#f5f763",duration:3000
     },
     {
      discount:'15',discountType:"%",color:"#f79452",duration:5000
     },
     {
      discount:'90',discountType:"fixed",color:"#48f0ea",duration:3000
     },
     {
      discount:'44',discountType:"%",color:"#F0C050",duration:5000
     },
     {
      discount:'10',discountType:"%",color:"#de77f2",duration:3000
     }
   
  ]);

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

    saveToLocalStorage("spinnerInformation", [...spinnerInformation, newSpinnerInfo]);
  };

  
  return {
    spinnerInformation,
    addSpinnerInformation
  };
};
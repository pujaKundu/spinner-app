import { useState } from "react";

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

export const useUserInformation = ()=>{
    const [userInformation,setUserInformation]=useState([]);

    const addUserInformation = (newUserInfo) =>{
        setUserInformation((prevUserInformation)=>[...prevUserInformation,newUserInfo])
    }

    return {
        userInformation,addUserInformation
    }
}

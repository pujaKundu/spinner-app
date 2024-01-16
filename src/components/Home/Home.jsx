import React, { useEffect, useState } from "react";
import { Form, SpinnerDetails, UserForm, UserInformation ,Wheel} from "../index";
import {
  useSpinnerState,
  useUserState,
  useUserInformation,
} from "../../utils/statesUtils";
import "./Home.css";
import SpinWheel from "../SpinWheel/SpinWheel";


const Home = () => {
  const { isSpinnerOpen, setIsSpinnerOpen } = useSpinnerState();
  const {
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
  } = useUserState();

  const { userInformation, addUserInformation } = useUserInformation();

  const handleAddUser = (event)=>{
    event.preventDefault();
    
    const newUserInfo ={
        name,email,discount,discountType,selectedDiscount,color
    }

      addUserInformation(newUserInfo)

      setName('');
      setDiscount("")
      setDiscountType("")
      setColor("#ffee99");
      setEmail("");
    
  }

  return (
    <div className="container">
      <div className="spinner-details-container">
      <Form
        color={color}
        setColor={setColor}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        setIsSpinnerOpen={setIsSpinnerOpen}
      />
      <SpinnerDetails userInformation={userInformation}/>
      </div>
      
      <UserInformation userInformation={userInformation} />
      <div className="spinner-container">
        {isSpinnerOpen && <UserForm setIsSpinnerOpen={setIsSpinnerOpen} setName={setName} setEmail={setEmail} handleAddUser={handleAddUser} userInformation={userInformation} 
        selectedDiscount={selectedDiscount} setSelectedDiscount={setSelectedDiscount} addUserInformation={addUserInformation} 
        />}
      </div>
      
    </div>
  );
};

export default Home;

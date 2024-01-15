import React, { useState } from "react";
import { Form, UserForm, UserInformation } from "../index";
import {
  useSpinnerState,
  useUserState,
  useUserInformation,
} from "../../utils/statesUtils";
import "./Home.css";

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
    console.log(newUserInfo)
    addUserInformation(newUserInfo)
  }

  console.log('user info', userInformation)

  console.log(`color: ${color}, discount: ${discount}, type: ${discountType} name:${name} email:${email}`)

  return (
    <div className="container">
      <Form
        color={color}
        setColor={setColor}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        setIsSpinnerOpen={setIsSpinnerOpen}
      />
      <UserInformation userInformation={userInformation}/>
      <div className="spinner-container">
        {isSpinnerOpen && <UserForm setIsSpinnerOpen={setIsSpinnerOpen} setName={setName} setEmail={setEmail} handleAddUser={handleAddUser} />}
      </div>
    </div>
  );
};

export default Home;

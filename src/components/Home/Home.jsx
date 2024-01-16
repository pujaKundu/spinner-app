import React, { useEffect, useState } from "react";
import { Form, SpinnerDetails, UserForm, UserInformation ,Wheel} from "../index";
import {
  useSpinnerState,
  useUserState,
  useUserInformation,
} from "../../utils/statesUtils";
import "./Home.css";
import {useSpinnerDetailState,useSpinnerInformation} from '../../utils/statesUtils'


const Home = () => {
  const { isSpinnerOpen, setIsSpinnerOpen } = useSpinnerState();
  const {
    
    name,
    setName,
    email,
    setEmail,
    selectedDiscount,
    setSelectedDiscount,
  } = useUserState();

  const { userInformation, addUserInformation } = useUserInformation();

  const {setDiscountType,setColor,setDiscount,color,discountType,discount}=useSpinnerDetailState();
  const {spinnerInformation,addSpinnerInformation}=useSpinnerInformation()

  const handleAddUser = (event)=>{
    event.preventDefault();
    
    const newUserInfo ={
        name,email,discount,discountType,selectedDiscount,color
    }

      addUserInformation(newUserInfo)

      setName('');
      setEmail("");
      setSelectedDiscount("")
    
  }


  const handleAddSpinnerInfo = (event)=>{
    event.preventDefault();
    
    const newSpinnerInfo ={
        discount,discountType,color
    }

      addSpinnerInformation(newSpinnerInfo)

      setIsSpinnerOpen(true)

      setDiscount("")
      setDiscountType("")
      setColor("#ffee99"); 
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
        handleAddSpinnerInfo={handleAddSpinnerInfo}
      />
      <SpinnerDetails spinnerInformation={spinnerInformation}/>
      </div>
      
      <UserInformation userInformation={userInformation} />
      <div className="spinner-container">
        {isSpinnerOpen && <UserForm setIsSpinnerOpen={setIsSpinnerOpen} setName={setName} setEmail={setEmail} handleAddUser={handleAddUser} userInformation={userInformation} 
        selectedDiscount={selectedDiscount} setSelectedDiscount={setSelectedDiscount} addUserInformation={addUserInformation} spinnerInformation={spinnerInformation}
        />}
      </div>
      
    </div>
  );
};

export default Home;

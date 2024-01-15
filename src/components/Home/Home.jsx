import React, { useEffect, useState } from "react";
import { Form, UserForm, UserInformation ,Wheel} from "../index";
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
    
  }

  const [result, setResult] = useState(null);

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
        {isSpinnerOpen && <UserForm setIsSpinnerOpen={setIsSpinnerOpen} setName={setName} setEmail={setEmail} handleAddUser={handleAddUser} userInformation={userInformation} result={result}
        setResult={setResult} selectedDiscount={selectedDiscount} setSelectedDiscount={setSelectedDiscount} addUserInformation={addUserInformation}
        />}
      </div>
      <div id="wheelCircle">
        {/* <SpinWheel
          segments={segments}
          segColors={segColors}
          winningSegment=""
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          primaryColoraround="#ffffffb4"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={50}
          downDuration={2000}
          userInformation={userInformation}
        /> */}
      </div>
    </div>
  );
};

export default Home;

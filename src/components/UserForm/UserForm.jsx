import React, { useState } from "react";
import { validateEmail } from "./helpers/validEmail";
import { IoMdClose } from "react-icons/io";
import "./UserForm.css";
import Wheel from "../Wheel/Wheel";

const UserForm = ({
  setIsSpinnerOpen,
  email,
  setName,
  setEmail,
  handleAddUser,
  selectedDiscount,
  setSelectedDiscount,
  spinnerInformation,setType,userInformation,setSpinDuration
}) => {

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
    setIsValidEmail(validateEmail(email));
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setName(name);
    setIsValidName(name.trim() !== ""); 
  };

  return (
    <div className="form-container">
      <Wheel
        selectedDiscount={selectedDiscount}email={email}
        setSelectedDiscount={setSelectedDiscount}
        handleAddUser={handleAddUser}
        spinnerInformation={spinnerInformation}setType={setType}
        isValidName={isValidName}
        isValidEmail={isValidEmail}userInformation={userInformation}
        setName={setName}
        setEmail={setEmail}
        setSpinDuration={setSpinDuration}
      />
      <form action="" className="form">
        <span className="close" onClick={() => setIsSpinnerOpen(false)}>
          <IoMdClose className="close-icon"/>
        </span>
        <h2>Try your luck</h2>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={handleNameChange}
          required
          className={!isValidName ? "invalid" : ""}
        />
        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleEmailChange}
          required
          className={!isValidEmail ? "invalid" : ""}
        />
         {!isValidName && (
          <p className="error-message-name">Name cannot be empty.</p>
        )}
        {!isValidEmail && (
          <p className="error-message-email">Please enter a valid email.</p>
        )}
      </form>
    </div>
  );
};

export default UserForm;

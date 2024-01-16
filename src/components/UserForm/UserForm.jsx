import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./UserForm.css";
import Wheel from "../Wheel/Wheel";

const UserForm = ({
  setIsSpinnerOpen,
  setName,
  setEmail,
  handleAddUser,
  userInformation,
  result,
  setResult,
  selectedDiscount,
  setSelectedDiscount,
  addUserInformation,onFinished,spinnerInformation
}) => {

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
    setIsValidEmail(validateEmail(email));
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setName(name);
    setIsValidName(name.trim() !== ""); // Check if the name is not empty
  };

  return (
    <div className="form-container">
      <Wheel
        userInformation={userInformation}
        result={result}
        setResult={setResult}
        selectedDiscount={selectedDiscount}
        setSelectedDiscount={setSelectedDiscount}
        handleAddUser={handleAddUser}
        addUserInformation={addUserInformation}
        onFinished={onFinished}spinnerInformation={spinnerInformation}
      />

      <form action="" className="form">
        <span className="close" onClick={() => setIsSpinnerOpen(false)}>
          <IoMdClose className="close-icon"/>
        </span>
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
          <p className="error-message">Name cannot be empty.</p>
        )}
        {!isValidEmail && (
          <p className="error-message">Please enter a valid email.</p>
        )}
        
      </form>
    </div>
  );
};

export default UserForm;

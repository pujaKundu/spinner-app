import React from "react";
import { IoMdClose } from "react-icons/io";
import "./UserForm.css";
import Wheel from "../Wheel/Wheel";

const UserForm = ({ setIsSpinnerOpen, setName, setEmail, handleAddUser ,userInformation,result, setResult,selectedDiscount,setSelectedDiscount,addUserInformation}) => {
  
  return (
    <div className="form-container">
      <Wheel userInformation={userInformation} result={result} setResult={setResult} selectedDiscount={selectedDiscount} setSelectedDiscount={setSelectedDiscount} handleAddUser={handleAddUser} addUserInformation={addUserInformation}/>

      <form action="" className="form">
        <span className="close" onClick={() => setIsSpinnerOpen(false)}>
          <IoMdClose />
        </span>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Enter yout email"
          onChange={(event) => setEmail(event.target.value)}
        />
        {/* <button className="try-btn" onClick={handleAddUser}>
          Try you luck
        </button> */}
      </form>
    </div>
  );
};

export default UserForm;

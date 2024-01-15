import React, { useState } from "react";
import { useSpinnerState, useUserState } from "../../utils/statesUtils";
import "./Form.css";

const Form = ({color,setColor,setDiscount,setDiscountType,setIsSpinnerOpen}) => {

  const handleSpinnerOpen = (event) => {
    event.preventDefault();
    setIsSpinnerOpen(true);
  };

  return (
    <>
      <form action="" className="spinner-form">
        <div className="spinner-inputs">
          <input type="text" placeholder="Enter discount" className="input" onChange={(event)=>setDiscount(event.target.value)} />
          <select name="" id="" className="select" onChange={(event)=>setDiscountType(event.target.value)}>
            <option value="percentage">%</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="color"
            id="colorPicker"
            value={color}
            className="color-picker"
            onChange={(event)=>setColor(event.target.value)}
          />
        </div>
        <button className="spin-btn" onClick={() => handleSpinnerOpen(event)}>
          Spin
        </button>
      </form>
    </>
  );
};

export default Form;

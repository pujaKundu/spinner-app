import React, { useState } from "react";
import "./Form.css";


const Form = ({color,setColor,setDiscount,setDiscountType,handleAddSpinnerInfo}) => {

  return (
    <>
      <form action="" className="spinner-form">
        <div className="spinner-inputs">
          <input type="text" placeholder="Enter discount" required className="input" onChange={(event)=>setDiscount(event.target.value)} />
          <select name="" id="" className="select" onChange={(event)=>setDiscountType(event.target.value)} required>
            <option value="%">%</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="color"
            id="colorPicker"
            value={color}
            className="color-picker"
            required
            onChange={(event)=>setColor(event.target.value)}
          />
        </div>
        <button className="spin-btn" onClick={() => handleAddSpinnerInfo(event)}>
          Spin
        </button>
      </form>
    </>
  );
};

export default Form;

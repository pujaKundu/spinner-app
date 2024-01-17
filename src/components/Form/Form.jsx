import React, { useState } from "react";
import "./Form.css";

const Form = ({
  color,
  setColor,
  discount,
  setDiscount,
  discountType,
  setDiscountType,
  handleAddSpinnerInfo
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!discount || !discountType || !color) {
      setErrorMessage("All fields must be filled");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
    validateForm();
  };

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
    validateForm();
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    validateForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Only proceed if the form is valid
    if (validateForm()) {
      handleAddSpinnerInfo(event);

      // Reset the form after submission
      setDiscount("");
      setDiscountType("");
      setColor("#ffee99");
    }
  };

  return (
    <>
      <form action="" className="spinner-form">
        <div className="spinner-inputs">
          <input
            type="number"
            placeholder="Enter discount"
            required
            className="input"
            value={discount}
            onChange={handleDiscountChange}
          />
          <select
            name=""
            id=""
            className="select"
            onChange={handleDiscountTypeChange}
            required
            value={discountType}
          >
            <option value="%">%</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="color"
            id="colorPicker"
            value={color}
            className="color-picker"
            required
            onChange={handleColorChange}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="spin-btn" onClick={handleSubmit}>
          Spin
        </button>
      </form>
    </>
  );
};

export default Form;

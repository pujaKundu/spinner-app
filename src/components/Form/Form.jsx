import React, { useState } from "react";
import "./Form.css";

const Form = ({
  color,
  setColor,
  discount,
  setDiscount,
  discountType,
  duration,
  setDuration,
  setDiscountType,
  handleAddSpinnerInfo,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled,setIsDisabled]=useState(false)

  const validateForm = () => {
    if (!discount || !discountType || !color) {
      setErrorMessage("All fields must be filled");
      return false;
    } else if (parseFloat(discount) < 0) {
      setErrorMessage("Discount value cannot be negative");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleDiscountChange = (event) => {
    const newDiscount = event.target.value;

    if (!isNaN(newDiscount) || newDiscount === "" || newDiscount === "-") {
      setDiscount(newDiscount);
      validateForm();
    }
  };

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
    validateForm();
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    validateForm();
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      handleAddSpinnerInfo(event);

      setDiscount("");
      setDiscountType("");
      setColor("#ffee99");
    }

    if(parseFloat(discount) < 0){
      setIsDisabled(true)
    }
  };

  return (
    <>
      <form action="" className="spinner-form">
      <h3>Customize Spinner</h3>
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
          <input
            type="number"
            value={duration}
            className="input duration-input"
            onChange={handleDurationChange}
            placeholder="Enter duration in miliseconds"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className={`${isDisabled ? "gray-btn":"spin-btn "}`} onClick={handleSubmit} disabled={isDisabled}>
          Spin
        </button>
      </form>
    </>
  );
};

export default Form;

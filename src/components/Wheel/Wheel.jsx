import React, { useState, useRef, useEffect } from "react";
import "./Wheel.css";


const Wheel = ({
  selectedDiscount,email,
  setSelectedDiscount,
  handleAddUser,
  spinnerInformation,setType,isValidName,
  isValidEmail,
  userInformation,setName,setEmail,setSpinDuration
}) => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);

  const canvasSize = 400;

  const spinner = {
    angle: 0,
    direction: 1,
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawSpinner(ctx);
  }, [selectedDiscount]);

  const drawSpinner = (ctx) => {
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY);

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ccc";
    ctx.fill();

    spinnerInformation.forEach((obj, index) => {
      const startAngle = ((2 * Math.PI) / spinnerInformation.length) * index+1;
      const endAngle = startAngle + (2 * Math.PI) / spinnerInformation.length;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(((spinner.angle * Math.PI) / 180) * spinner.direction);
      ctx.translate(-centerX, -centerY);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = obj.color;
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textX =
        centerX +
        (radius / 2) * Math.cos(startAngle + (endAngle - startAngle) / 2);
      const textY =
        centerY +
        (radius / 2) * Math.sin(startAngle + (endAngle - startAngle) / 2);
      ctx.fillText(`${obj?.discount} ${obj?.discountType}`, textX, textY);
      ctx.restore();
      
      // // Draw outer wheel circle
      const outerCircleRadius = Math.min(radius + 5, canvasSize / 2 - 6); // Adjust the size of the outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerCircleRadius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#c7c7c7"; // Adjust the color of the outer circle
      ctx.stroke();

      // // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 150, 0, 2 * Math.PI);
      ctx.fillStyle = "#ccc";
      ctx.fill();

      //draw inner circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.2, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();

      // draw needle
      if (selectedDiscount !== null) {
       
        const selectedObjectIndex = spinnerInformation.findIndex(
          (obj) => obj.discount == selectedDiscount
        );

        const sliceStartAngle =
          ((2 * Math.PI) / spinnerInformation.length) * selectedObjectIndex;

        const needleAngle =
          sliceStartAngle +
          ((spinner.angle * Math.PI) / 180) * spinner.direction;

        // Draw the triangular needle
        const needleLength = radius * 0.25;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(needleAngle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(12, -needleLength);
        ctx.lineTo(-12, -needleLength);
        ctx.closePath();

        ctx.fillStyle = "#ff6347";
        ctx.fill();

        ctx.restore();
      }
    });
  };


  const startSpin = () => {
    if (!spinning && isValidName && isValidEmail) {
      // Check if the email is already used
      const isEmailUsed = userInformation.some((user) => user.email === email);
  
      if (isEmailUsed) {
        alert('Email is already used. Each user can spin the wheel only once.');
      } else {
        setSpinning(true);
        const startTime = Date.now();
        spin(startTime);
      }
    }
  };


  const spin = (startTime) => {
    const selectedObjectIndex = spinnerInformation.findIndex(
      (obj) => obj.discount == selectedDiscount
    );
    const ctx = canvasRef.current.getContext("2d");
    const duration = spinnerInformation[spinnerInformation.length-1]?.duration;//3000
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    console.log(duration)

    if (elapsed >= duration) {
      spinner.angle = 0;
      spinner.direction = 0;
      setSpinning(false);
      drawSpinner(ctx);
      return;
    }

    // Calculate the starting angle based on the selected discount
    
    const startAngle =
      ((2 * Math.PI) / spinnerInformation.length) * selectedObjectIndex;

    // Calculate the rotation angle based on the elapsed time
    const rotationPercentage = elapsed / duration;
    const maxRotation = 360 * 10;
    spinner.angle = startAngle + rotationPercentage * maxRotation;
    drawSpinner(ctx);

    requestAnimationFrame(() => spin(startTime));
  };

  useEffect(() => {
    if (!spinning) {
      setName("");
      setEmail("");
    }
  }, [spinning]);

  useEffect(() => {
    const selectedObjectIndex = Math.floor(
      Math.random() * spinnerInformation.length
    );
    setSelectedDiscount(spinnerInformation[selectedObjectIndex]?.discount);
    setType(spinnerInformation[selectedObjectIndex]?.discountType)
    setSpinDuration(spinnerInformation[selectedObjectIndex]?.duration)
  }, []);

  return (
    <div className="wheel-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="wheel"
      ></canvas>
         <button
        onClick={(event) => {
          if (isValidName && isValidEmail) {
            handleAddUser(event);
            startSpin();
          } else {
            
          }
        }}
        disabled={!isValidName || !isValidEmail}
        className="spinner-btn"
      >
        Try your luck
      </button>
     
    </div>
  );
};
export default Wheel;

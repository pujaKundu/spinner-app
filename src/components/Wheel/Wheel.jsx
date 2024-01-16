import React, { useState, useRef, useEffect } from "react";
import "./Wheel.css";

let discountType = "";

const Wheel = ({
  userInformation,
  result,
  setResult,
  selectedDiscount,
  setSelectedDiscount,
  handleAddUser,
  spinDuration,
}) => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);

  const [wheelSlices, setWheelSlices] = useState([]);

  const canvasSize = 400;

  // console.log("selected discount", selectedDiscount);

  const spinner = {
    angle: 0,
    direction: 1,
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawSpinner(ctx);
  }, [selectedDiscount,wheelSlices]);

  const drawSpinner = (ctx) => {
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY);

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ccc";
    ctx.fill();

    userInformation.forEach((obj, index) => {
      const startAngle = ((2 * Math.PI) / userInformation.length) * index;
      const endAngle = startAngle + (2 * Math.PI) / userInformation.length;
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
       
        const selectedObjectIndex = userInformation.findIndex(
          (obj) => obj.discount == selectedDiscount
        );

        const sliceStartAngle =
          ((2 * Math.PI) / userInformation.length) * selectedObjectIndex;

        const needleAngle =
          sliceStartAngle +
          ((spinner.angle * Math.PI) / 180) * spinner.direction;

        // Draw the triangular needle
        const needleLength = radius * 0.2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(needleAngle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(8, -needleLength);
        ctx.lineTo(-8, -needleLength);
        ctx.closePath();

        ctx.fillStyle = "blue";
        ctx.fill();

        ctx.restore();
      }

      discountType = obj.discountType;
    });
  };

  const startSpin = () => {
    if (!spinning) {
      setSpinning(true);
      const startTime = Date.now();
      spin(startTime);
    }
  };

  const spin = (startTime) => {
    const ctx = canvasRef.current.getContext("2d");
    const duration = 3000;
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    if (elapsed >= duration) {
      spinner.angle = 0;
      spinner.direction = 0;
      setSpinning(false);
      drawSpinner(ctx);
      return;
    }

    // Calculate the starting angle based on the selected discount
    const selectedObjectIndex = userInformation.findIndex(
      (obj) => obj.discount == selectedDiscount
    );
    const startAngle =
      ((2 * Math.PI) / userInformation.length) * selectedObjectIndex;

    // Calculate the rotation angle based on the elapsed time
    const rotationPercentage = elapsed / duration;
    const maxRotation = 360 * 10;
    spinner.angle = startAngle + rotationPercentage * maxRotation;
    drawSpinner(ctx);

    requestAnimationFrame(() => spin(startTime));
  };

  useEffect(() => {
    const selectedObjectIndex = Math.floor(
      Math.random() * userInformation.length
    );
    setSelectedDiscount(userInformation[selectedObjectIndex]?.discount);
  }, []);

  // useEffect(() => {
  //   if (selectedDiscount !== null) {
  //     const selectedObject = userInformation.find(
  //       (obj) => obj.discount == selectedDiscount
  //     );
  //     setWheelSlices((prevSlices) => [
  //       ...prevSlices,
  //       {
  //         startAngle: ((2 * Math.PI) / userInformation.length) * selectedObject.index,
  //         endAngle:
  //           ((2 * Math.PI) / userInformation.length) * (selectedObject.index + 1),
  //         color: selectedObject.color,
  //         discount: selectedObject.discount,
  //         discountType: selectedObject.discountType,
  //       },
  //     ]);
  //   }
  // }, [selectedDiscount]);

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
          handleAddUser(event);
          startSpin();
        }}
        disabled={spinning}
        className="spinner-btn"
      >
        Try your luck
      </button>
      {selectedDiscount !== null && (
        <p className="text">
          Congratulations! <br />
          You have won {selectedDiscount} discount
        </p>
      )}
    </div>
  );
};
export default Wheel;

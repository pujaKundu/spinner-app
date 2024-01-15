import React, { useState, useRef, useEffect } from "react";
import './Wheel.css'


const Wheel = ({ userInformation, result, setResult,selectedDiscount,setSelectedDiscount,handleAddUser,addUserInformation}) => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);

  console.log('selected discount',selectedDiscount)

  const spinner = {
    angle: 0,
    direction: 1, // 1 for clockwise, -1 for anticlockwise
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

    userInformation.forEach((obj, index) => {
      const startAngle = ((2 * Math.PI) / userInformation.length) * index;
      const endAngle = startAngle + (2 * Math.PI) / userInformation.length;
      ctx.save(); // Save the current state
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
      ctx.fillText(`${obj?.discount?.toString()} ${obj?.discountType}`, textX, textY);
      
      ctx.restore(); 
    });

    if (selectedDiscount !== null) {
      const arrowLength = 30;
      const arrowAngle = ((spinner.angle * Math.PI) / 180) * spinner.direction;
      const arrowX = centerX + radius * Math.cos(arrowAngle);
      const arrowY = centerY + radius * Math.sin(arrowAngle);
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX + arrowLength * Math.cos(arrowAngle),
        arrowY + arrowLength * Math.sin(arrowAngle)
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FF0000";
      ctx.stroke();

// draw circle
    // ctx.beginPath();
    // ctx.arc(50, 0, 200, 0, Math.PI * 2, false);
    // ctx.closePath();
    // ctx.lineWidth = 20;
    // ctx.strokeStyle =  "white";
    // ctx.stroke();

    // Draw the needle
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(arrowAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -arrowLength);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.restore();
    }
  };

  const startSpin = () => {
    if (!spinning) {
      setSpinning(true);
      spin();
    }
  };

  const spin = () => {
    const ctx = canvasRef.current.getContext("2d");
    if (spinner.angle >= 360) {
      spinner.angle = 0;
      spinner.direction = Math.random() < 0.5 ? 1 : -1; 
      setSpinning(false);
      const selectedObjectIndex = Math.floor(
        Math.random() * userInformation.length
      );
      setSelectedDiscount(userInformation[selectedObjectIndex]?.discount);
      
      drawSpinner(ctx);
   
      return;
    }
    spinner.angle += Math.floor(Math.random() * 30) + 10; 
    drawSpinner(ctx);
    requestAnimationFrame(spin);
  };

  
  return (
    <div >
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="wheel"
      ></canvas>
      <button onClick={(event)=>{handleAddUser(event);startSpin();}} disabled={spinning} className="spinner-btn">
        Try your luck
      </button>
      {selectedDiscount !== null && <p className="text">Congratulations! <br />You have won {selectedDiscount} discount</p>}
    </div>
  );
};
export default Wheel;

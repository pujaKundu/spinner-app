import React from "react";
import "./UserInformation.css";

const UserInformation = ({ userInformation }) => {
  return (
    <>
      <table className="information-container">
        <thead>
          <tr>
            <th className="information">Email List</th>
            <th className="information">Name</th>
            <th className="information">Discount</th>
          </tr>
        </thead>

        <tbody>
          {userInformation.map((info, index) => (
            <tr key={index} className="row">
              <td className="cell">{info?.email}</td>
              <td className="cell">{info?.name}</td>
              <td className="cell">
                {`${info?.selectedDiscount} 
                ${info?.discountType}`}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserInformation;

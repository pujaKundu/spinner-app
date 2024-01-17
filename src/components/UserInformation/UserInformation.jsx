import React,{useEffect,useState} from "react";
import "./UserInformation.css";

const UserInformation = ({ userInformation ,spinDuration}) => {
  const [displayedDiscounts, setDisplayedDiscounts] = useState({});

  useEffect(() => {
   
    const displayDiscountAfterDelay = (index) => {
      setTimeout(() => {
        setDisplayedDiscounts((prevDiscounts) => ({
          ...prevDiscounts,
          [index]: true,
        }));
      }, spinDuration+2000);
    };

    userInformation.forEach((info, index) => {
      if (!displayedDiscounts[index]) {
        displayDiscountAfterDelay(index);
      }
    });
  }, [userInformation, displayedDiscounts]);

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

                {displayedDiscounts[index] ? (
                  `${info?.selectedDiscount} ${info?.type}`
                ) : (
                  "Loading..."
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserInformation;

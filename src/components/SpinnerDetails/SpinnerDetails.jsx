import React from 'react'
import './SpinnerDetails.css'

const SpinnerDetails = ({spinnerInformation}) => {

  return (
    <>
       <table className="spinner-information-container">
        <thead>
          <tr>
            <th className="information">Discount</th>
            <th className="information">Type</th>
            <th className="information">Color</th>
          </tr>
        </thead>

        <tbody>
          {spinnerInformation?.map((info, index) => (
            <tr key={index} className="row">
              <td className="spinner-cell">{info?.discount}</td>
              <td className="spinner-cell">{info?.discountType}</td>
              <td className="color-cell" style={{backgroundColor:info?.color}}>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SpinnerDetails

import React from 'react'
import './UserInformation.css'

const UserInformation = ({userInformation}) => {
  const content = userInformation.map((info)=><div className=''>
    <div>{info?.email}</div>
    <div>{info?.name}</div>
    <div>{info?.discount}</div>
  </div>)
  return (
    <>
    <div className='information-container'>
      <div className='information'>Email List</div>
      <div className='information'>Name</div>
      <div className='information'>Discount</div>
    </div>
    {content}
    </>
  )
}

export default UserInformation

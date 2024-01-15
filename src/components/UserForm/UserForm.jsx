import React from 'react'
import { IoMdClose } from "react-icons/io";
import './UserForm.css'

const UserForm = ({setIsSpinnerOpen,setName,setEmail,handleAddUser}) => {

  return (
    <div className='form-container'>
      <form action="" className='form'>
        <span className='close' onClick={()=>setIsSpinnerOpen(false)}>
            <IoMdClose />
        </span>
        <input type="text" placeholder='Enter your name' onChange={(event)=>setName(event.target.value)} />
        <input type="email" placeholder='Enter yout email' onChange={(event)=>setEmail(event.target.value)} />
        <button className='try-btn' onClick={handleAddUser}>Try you luck</button>
      </form>
    </div>
  )
}

export default UserForm

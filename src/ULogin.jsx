import React, { useState } from 'react';
import './Login.css';

function ULogin({setUser}) {
  const [username,setusername] =useState("");
  const handleUser = ()=>{
    if(!username){alert("please fill the username to continue..."); return;} 
    setUser(username)
    localStorage.setItem("uname",username);
  }
  return (
    <div className='totdiv'>
      <h1>CHATBOT</h1>
      <div className='Uinput'>
        <input type='text' placeholder='Enter an Unique Username' onChange={(e)=>{setusername(e.target.value)}}/>
        <button onClick={handleUser}>Submit</button>
      </div>
    </div>
  )
}

export default ULogin
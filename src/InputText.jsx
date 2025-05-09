  import React, { useState } from 'react';
  import './Login.css'

  function InputText({addMessage}) {
    const [message,setMessage]=useState('');
    const sendMessage =  ()=>{
      addMessage({message});
      setMessage("");
    }
    return (
      <div className='messageBox'>
        <textarea className='message' id='message' placeholder='Type your text here ' rows='3' cols='75' value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
        <button onClick={sendMessage}>Submit</button>
      </div>
    )
  }

  export default InputText
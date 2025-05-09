import React from 'react';
import './Login.css';
import InputText from './InputText';

function SenderChat({message,username}) {
  return (
    <div className="chat-row left">
      <img src="./sender.jpg" alt="img" className="profile-pic" />
      <div className="chat-bubble sender-bubble">
      <div className="username">{username}</div>
      <div className="chat-bubble sender-bubble">{message}</div>
      </div>
    </div>
  );
}

function ReceiverChat({message,username}) {
  return (
    <div className="chat-row right">
      <div className="chat-bubble receiver-bubble">
      <div className="username">{username}</div>
      <div className="chat-bubble receiver-bubble">{message}</div>
      </div>
      <img src="./me.jpg" alt="img" className="profile-pic" />
    </div>
  );
}

function ChatList({ chats }) {
  const user = localStorage.getItem('uname');
  return (
    <div className="chat-container">
      {chats.map((chat, index) => {
        if (chat.username === user) {
          return <SenderChat key={index} message={chat.message} username={chat.username} />;
        } else {
          return <ReceiverChat key={index} message={chat.message} username={chat.username} />;
        }
      })}
    </div>
  );
}


export default ChatList;

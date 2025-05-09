import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import ChatList from './ChatList';
import ULogin from './ULogin';
import socketIOClient from 'socket.io-client';
import InputText from './InputText';

function ChatScreenHeader() {
  const [user, setUser] = useState(localStorage.getItem('uname'));
  const [chats, setChats] = useState([]);
  const [group, setGroup] = useState('general'); // default group
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient('http://localhost:5000');

    // Join the selected group when component mounts
    socketRef.current.emit("joinGroup", group);

    socketRef.current.on('chat', (chat) => {
      if (chat.groupName === group) {
        setChats((prevChats) => [...prevChats, chat]);
      }
    });

    return () => {
      socketRef.current.emit("leaveGroup", group);
      socketRef.current.disconnect();
    };
  }, [group]);

  const sendToSocket = (chat) => {
    socketRef.current.emit('chat', {
      ...chat,
      username: localStorage.getItem("uname"),
      groupName: group,
    });
  };

  const addMessage = (chat) => {
    sendToSocket(chat);
  };

  const logout = () => {
    localStorage.removeItem('uname');
    setUser('');
  };

  return (
    <div>
      {user ? (
        <div>
          <h1 className='Header'>CHATBOT</h1>
          <div className='SecondLine'>
            <h3>Username: {user}</h3>
            <select onChange={(e) => setGroup(e.target.value)} value={group}>
              <option value="general">General</option>
              <option value="sports">Sports</option>
              <option value="tech">Tech</option>
              <option value="music">Music</option>
            </select>
            <p onClick={logout} style={{ cursor: 'pointer' }}>LOGOUT</p>
          </div>
          <ChatList chats={chats} />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <ULogin setUser={setUser} />
      )}
    </div>
  );
}


export default ChatScreenHeader;

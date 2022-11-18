import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import socketIOClient, { io } from 'socket.io-client';

export default function Auth() {
  const [userName, setUserName] = useState<string | null>(null);
  const [textInputVal, setTextInputVal] = useState('');
  const [messages, setMessages] = useState<object[]>([]);
  const [chatRoom, setChatRoom] = useState<string | null>('');

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const userNamePrompt = prompt('User Name');
  //     const chatRoom = prompt('Chat Room');
  //     setUserName(userNamePrompt);
  //     setChatRoom(chatRoom);
  //   }
  // }, []);

  const socket = socketIOClient('http://localhost:3001');

  // const chatRoom = 'aseersaad'.split('').sort().join('');
  socket.emit('chat_room', { userName, chatRoom });

  socket.on('receive-message', (msg) => {
    setMessages([...messages, msg]);
  });

  return (
    <div className={styles.container}>
      <input type='text' value={textInputVal} onChange={(e) => setTextInputVal(e.target.value)} />
      <button
        onClick={() => {
          const msgObj = { user: userName, message: textInputVal };
          socket.emit('send-message', msgObj);
          setTextInputVal('');
        }}>
        Send
      </button>
      {messages?.map((item, idx) => {
        return (
          <div key={idx} style={{ display: 'flex' }}>
            <h2 style={{ color: '#fff' }}>{item.user}: </h2>
            <h2 style={{ color: '#fff', marginLeft: 14 }}>{item.message}</h2>
          </div>
        );
      })}
    </div>
  );
}

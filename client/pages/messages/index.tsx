import React, { useState, useEffect } from 'react';
import socketIOClient, { io } from 'socket.io-client';

export default function Messages() {
  const [textInputVal, setTextInputVal] = useState('');
  const [messages, setMessages] = useState<object[]>([]);
  const [chatRoom, setChatRoom] = useState<string | null>('');

  const socket = socketIOClient('http://localhost:3001');

  // socket.emit('chat_room', { userName, chatRoom });

  socket.on('receive-message', (msg) => {
    setMessages([...messages, msg]);
  });
  return (
    <div>
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

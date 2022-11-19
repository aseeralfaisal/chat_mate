import React, { useState, useEffect } from 'react';
import socketIOClient, { io } from 'socket.io-client';
import Button1 from '../../Components/Button1';
import InputField from '../../Components/InputField';
import { useAppSelector } from '../../redux/hooks';

export default function Messages() {
  const [textInputVal, setTextInputVal] = useState('');
  const [messages, setMessages] = useState<object[]>([]);
  const username = useAppSelector((state) => state.user.username);
  const chatroom = useAppSelector((state) => state.chat.chatRoom);

  const socket = socketIOClient('http://localhost:3001');

  socket.emit('chat_room', { userName: username, chatRoom: chatroom });

  socket.on('receive-message', (msg) => {
    setMessages([...messages, msg]);
  });

  const action = () => {
    const msgObj = { user: username, message: textInputVal };
    socket.emit('send-message', msgObj);
    setTextInputVal('');
  };
  return (
    <div>
      <InputField type='text' placeholder='Type a message' value={textInputVal} setValue={setTextInputVal} />
      <Button1 title='Send' action={action} />
      {messages?.map((item: any, idx) => {
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

import React, { useEffect, useMemo, useState } from 'react';
import Router from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setChatRoom } from '../../redux/slices/chatRoom';
import socketIOClient from 'socket.io-client';
import { setRecieverName } from '../../redux/slices/userSlice';
import ChatComponent from './chat.component';
import Api from '../api/api.interceptors';

const ChatContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [usersList, setUsersList] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const username = useAppSelector((state) => state.user.userName);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const recieverName = useAppSelector((state) => state.user.recieverName);


  useEffect(() => {
    (async () => {
      const messagesData = await Api.post('/getchat', { room: chatRoom });
      const data = messagesData?.data[0]?.messages;
      console.log(data);
      setMessages(data);
    })();
  }, [chatRoom]);

  useEffect(() => {
    (async () => {
      try {
        const usersList = await Api.get('/users');
        setUsersList(usersList?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const socket = useMemo(() => socketIOClient('http://localhost:3001'), []);

  useEffect(() => {
    socket.emit('chat_room', { username, chatRoom });
    return () => {
      socket.off('chat_room');
    };
  }, [chatRoom, socket, username]);


  useEffect(() => {
    socket.on('receive-message', (data) => {
      setMessages((prevMessages: any) => [...prevMessages, data]);
    });
    return () => {
      socket.off('receive-message');
    };
  }, [socket]);


  const sendMessageAction = () => {
    if (messageValue === "") return;
    const message = { username, receiver: recieverName, text: messageValue };
    socket.emit('send-message', message);

    setMessageValue('');
  };


  const createChatRoom = (toUser: string) => {
    const chatRoomLabel = (username + toUser).split('').sort().join('');
    dispatch(setChatRoom(chatRoomLabel));
    dispatch(setRecieverName(toUser));
  };

  useEffect(() => {
    if (username === '') {
      Router.push({ pathname: '/' });
    }
  }, [username]);

  return (
    <ChatComponent
      users={usersList}
      username={username}
      recieverName={recieverName}
      messages={messages}
      createChatRoom={createChatRoom}
      messageValue={messageValue}
      setMessageValue={setMessageValue}
      sendMessageAction={sendMessageAction}
    />
  );
};

export default ChatContainer;

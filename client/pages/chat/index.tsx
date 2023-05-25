import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setChatRoom } from '../../redux/slices/chatRoom';
import socketIOClient from 'socket.io-client';
import { setRecieverName } from '../../redux/slices/userSlice';
import ChatPage from '../../lib/chat.component';
import Api from '../api/api.interceptors';

const baseURL = process?.env?.BASE_URL;

const ChatContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [usersList, setUsersList] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [msgSent, setMsgSent] = useState(false);
  const username = useAppSelector((state) => state.user.userName);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const recieverName = useAppSelector((state) => state.user.recieverName);

  useEffect(() => {
    (async () => {
      const messagesData = await Api.post('/getchat', { room: chatRoom });
      setMessages(messagesData?.data[0]?.messages);
    })();
  }, [chatRoom, msgSent]);

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

  const socket = socketIOClient(baseURL || '');

  useEffect(() => {
    socket.emit('chat_room', { username, chatRoom });
    return () => {
      socket.off('chat_room');
    };
  }, [chatRoom, socket, username]);

  useEffect(() => {
    socket.on('receive-message', (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      socket.off('receive-message');
    };
  }, [messages, socket, msgSent]);

  const sendMessageAction = () => {
    if (chatRoom === '' || chatRoom === null || chatRoom === undefined) {
      return alert('Chatroom Error');
    }
    const message = { username, receiver: recieverName, text: messageValue };
    if (messageValue === '') return;
    socket.emit('send-message', message);
    setMessageValue('');
    setMsgSent(!msgSent);
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
    <ChatPage
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

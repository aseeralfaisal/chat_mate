import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setChatRoom } from '../../redux/features/chatRoom';
import socketIOClient from 'socket.io-client';
import { setRecieverName } from '../../redux/features/userSlice';
import { fetchApi } from '../../fetch.api';
import ChatPage from './chat.component';

const ChatContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [usersList, setUsersList] = useState([]);
  const [textInputVal, setTextInputVal] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [msgSent, setMsgSent] = useState(false);
  const userName = useAppSelector((state) => state.user.username);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const recieverName = useAppSelector((state) => state.user.recieverName);

  useEffect(() => {
    (async () => {
      const messagesData = await fetchApi('getchat', 'POST', { room: chatRoom });
      setMessages(messagesData?.value[0]?.messages);
    })();
  }, [chatRoom, msgSent]);

  useEffect(() => {
    (async () => {
      const usersList = await fetchApi('users', 'GET');
      setUsersList(usersList?.value);
    })();
  }, []);

  const socket = socketIOClient('http://localhost:3001');

  useEffect(() => {
    socket.emit('chat_room', { userName, chatRoom });
    return () => {
      socket.off('chat_room');
    };
  }, [chatRoom, socket, userName]);

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
    const message = { username: userName, text: textInputVal };
    if (textInputVal === '') return;
    socket.emit('send-message', message);
    setTextInputVal('');
    setMsgSent(!msgSent);
  };

  const createChatRoom = (toUser: string) => {
    const chatRoomLabel = (userName + toUser).split('').sort().join('');
    dispatch(setChatRoom(chatRoomLabel));
    dispatch(setRecieverName(toUser));
  };

  useEffect(() => {
    if (userName === '') {
      Router.push({ pathname: '/' });
    }
  }, [userName]);

  return (
    <ChatPage
      users={usersList}
      username={userName}
      recieverName={recieverName}
      messages={messages}
      createChatRoom={createChatRoom}
      textInputVal={textInputVal}
      setTextInputVal={setTextInputVal}
      sendMessageAction={sendMessageAction}
    />
  );
};

export default ChatContainer;

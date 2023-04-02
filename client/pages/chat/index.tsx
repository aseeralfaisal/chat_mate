import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setChatRoom } from '../../redux/features/chatRoom';
import socketIOClient from 'socket.io-client';
import { setRecieverName } from '../../redux/features/userSlice';
import { fetchApi } from '../../fetch.api';
import ChatPage from './chat.presenter';

const ChatContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [usersList, setUsersList] = useState([]);
  const [textInputVal, setTextInputVal] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [msgSent, setMsgSent] = useState(false);
  const username = useAppSelector((state) => state.user.username);
  const chatroom = useAppSelector((state) => state.chat.chatRoom);
  const recieverName = useAppSelector((state) => state.user.recieverName);

  useEffect(() => {
    (async () => {
      const messagesData = await fetchApi('getchat', 'POST', { room: chatroom });
      setMessages(messagesData?.value[0]?.messages);
    })();
  }, [chatroom, msgSent]);

  useEffect(() => {
    (async () => {
      const usersList = await fetchApi('users', 'GET');
      setUsersList(usersList?.value);
    })();
  }, []);

  const socket = socketIOClient('http://localhost:3001');

  socket.emit('chat_room', { userName: username, chatRoom: chatroom });

  useEffect(() => {
    socket.on('receive-message', (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      socket.off('receive-message');
    };
  }, [messages, socket, msgSent]);

  const sendMessageAction = () => {
    if (chatroom === '' || chatroom === null || chatroom === undefined) {
      return alert('Chatroom Error');
    }
    const message = { username: username, text: textInputVal };
    socket.emit('send-message', message);
    setTextInputVal('');
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
      textInputVal={textInputVal}
      setTextInputVal={setTextInputVal}
      sendMessageAction={sendMessageAction}
    />
  );
};

export default ChatContainer;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setChatRoom } from '../../redux/features/chatRoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/UserList.module.scss';
import socketIOClient, { io } from 'socket.io-client';
import Button1 from '../../Components/Button1';
import InputField from '../../Components/InputField';
import { setToUserName } from '../../redux/features/userSlice';
const BASE_URL = 'http://localhost:3001';

const Users = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [users, setUsers] = useState([]);
  const username = useAppSelector((state) => state.user.username);
  const [textInputVal, setTextInputVal] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const chatroom = useAppSelector((state) => state.chat.chatRoom);
  const toUsername = useAppSelector((state) => state.user.toUsername);
  const [msgSent, setMsgSent] = useState(false);

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

  const action = () => {
    if (chatroom === '' || chatroom === null || chatroom === undefined) {
      return alert('Chatroom Error');
    }
    const message = { username: username, text: textInputVal };
    socket.emit('send-message', message);
    setTextInputVal('');
    setMsgSent(!msgSent);
  };

  useEffect(() => {
    (async () => {
      const users = await axios.get(`${BASE_URL}/users`);
      setUsers(users.data);
    })();
  }, []);

  const createChatRoom = (toUser: string) => {
    const chatRoomLabel = (username + toUser).split('').sort().join('');
    dispatch(setChatRoom(chatRoomLabel));
    dispatch(setToUserName(toUser));
  };

  const Chats = () => (
    <div style={{ top: 10, left: 400, overflowY: 'scroll', overflow: 'hidden' }}>
      {messages &&
        messages.map((msg: { username: string; text: string }, idx: number) => (
          <div key={idx} className={styles.msg}>
            {msg.username !== username && <h2 style={{ color: '#fff' }}>{msg.username}: </h2>}
            <label style={{ color: '#fff', marginLeft: 14 }}>{msg.text}</label>
          </div>
        ))}
    </div>
  );

  useEffect(() => {
    (async () => {
      const msgs = await axios.post(`${BASE_URL}/getchat`, { room: chatroom });
      setMessages(msgs.data[0]?.messages);
    })();
  }, [chatroom, msgSent]);

  useEffect(() => {
    if (username === '') {
      Router.push({ pathname: '/' });
    }
  }, [username]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginRight: 60,
      }}>
      <div className={styles.container}>
        <InputField reduxValue={false} type='text' placeholder='Search Users...' width={280} />
        {users
          ?.filter((user: { username: string }) => user.username !== username)
          .map((user: { username: string; id: number }, idx) => (
            <div
              key={idx}
              className={styles.userlist}
              style={{
                backgroundColor: toUsername === user.username ? '#664ccf33' : '#00000000',
                borderRadius: 12,
                padding: 10,
              }}>
              <FontAwesomeIcon icon={icons.faUserCircle} color='#eee' fontSize={32} />
              <label className={styles.username} key={user.id} onClick={() => createChatRoom(user.username)}>
                {user.username}
              </label>
            </div>
          ))}
      </div>
      <div>
        <Chats />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <InputField
            type='text'
            placeholder='Type a message'
            width={950}
            value={textInputVal}
            setValue={setTextInputVal}
          />
          <Button1 title='Send' action={action} width={150} marginTop={0} margin={14} />
        </div>
      </div>
    </div>
  );
};

export default Users;

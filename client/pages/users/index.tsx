import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setChatRoom } from '../../redux/features/chatRoom';
const BASE_URL = 'http://localhost:3001';

const Users = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [users, setUsers] = useState([]);
  const username = useAppSelector((state) => state.user.username);

  useEffect(() => {
    (async () => {
      const users = await axios.get(`${BASE_URL}/users`);
      setUsers(users.data);
    })();
  }, []);

  const createChatRoom = (toUser: string) => {
    const chatRoomVal = (username + toUser).split('').sort().join('');
    console.log({ chatroom: chatRoomVal });
    dispatch(setChatRoom(chatRoomVal));
    route.push('/message');
  };

  return (
    <div>
      {users
        ?.filter((user: { username: string }) => user.username !== username)
        .map((user: { username: string; id: number }) => {
          return (
            <h1 style={textStyle} key={user.id} onClick={() => createChatRoom(user.username)}>
              {user.username}
            </h1>
          );
        })}
    </div>
  );
};

export default Users;

const textStyle = {
  color: '#fff',
  textTransform: 'capitalize',
  fontWeight: 'normal',
  cursor: 'pointer',
  fontSize: 20,
};

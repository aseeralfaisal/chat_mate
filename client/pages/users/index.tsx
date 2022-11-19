import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const BASE_URL = 'http://localhost:3001';

const Users = () => {
  const route = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await axios.get(`${BASE_URL}/users`);
      setUsers(users.data);
    })();
  }, []);

  return (
    <div>
      {users.map((user: { username: string; id: number }) => {
        return (
          <h1 style={textStyle} key={user.id}>
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

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import socketIOClient, { io } from 'socket.io-client';

export default function Home() {
  const [response, setResponse] = useState('');
  const [val, setVal] = useState('');

  const socket = socketIOClient('http://localhost:3001');

  return (
    <div className={styles.container}>
      <h1>Hello Dev 🧑‍💻😈</h1>
      <input type='text' value={val} onChange={(e) => setVal(e.target.value)} />
      <button
        onClick={() => {
          socket.emit('msg', val);
          setVal('');
        }}>
        Send
      </button>
    </div>
  );
}

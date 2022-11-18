import express from 'express';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

dotenv.config();

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello Dev 🧑‍💻😈' });
});

let chatRoomVal: string;
io.on('connection', (socket) => {
  socket.on('chat_room', ({ userName, chatRoom }) => {
    chatRoomVal = chatRoom;
    console.log(chatRoomVal);
    socket.join(chatRoomVal);
  });
  socket.on('send-message', (message) => {
    socket.to(chatRoomVal).emit('receive-message', message);
  });
});

server.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT} 🚀😈🔥`);
});

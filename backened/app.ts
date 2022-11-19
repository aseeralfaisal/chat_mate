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

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  //409: already exists
  if (userExists) return res.status(409).send('User already exist');
  const register = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  if (register) {
    res.status(200).send('Registration successful');
  }
});

let chatRoomVal: string;
io.on('connection', (socket) => {
  socket.on('chat_room', ({ userName, chatRoom }) => {
    chatRoomVal = chatRoom;
    socket.join(chatRoomVal);
  });
  socket.on('send-message', (message) => {
    socket.to(chatRoomVal).emit('receive-message', message);
  });
});

server.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT} 🚀😈🔥`);
});

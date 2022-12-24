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
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (userExists) {
    if (userExists.password === password) {
      res.status(200).send('Login successful');
    } else {
      res.status(404).send('Wrong password');
    }
  }
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  const userlist = users.filter((user) => delete user['password']);
  res.json(userlist);
});

let chatRoomVal: string;
io.on('connection', (socket) => {
  socket.on('chat_room', async ({ userName, chatRoom }) => {
    chatRoomVal = chatRoom;
    socket.join(chatRoomVal);
  });
  socket.on('send-message', (message) => {
    socket.to(chatRoomVal).emit('receive-message', message);
    console.log(message);
    prisma.message
      .create({
        data: {
          room: chatRoomVal,
          text: message.message,
          username: message.user,
        },
        include: {
          User: message.user,
        },
      })
      .catch((err) => console.log(err));
  });
});

app.get('/chat', async (req, res) => {
  const messages = await prisma.message.findMany();
  res.send(messages);
});

server.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT} 🚀😈🔥`);
});

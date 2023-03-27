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
io.on('connection', async (socket) => {
  socket.on('chat_room', async ({ userName, chatRoom }) => {
    chatRoomVal = chatRoom;
    socket.join(chatRoomVal);
    const chats = await prisma.chatroom.findMany({
      where: { room: chatRoomVal },
      include: { messages: true },
    });
    // socket.to(chatRoomVal).emit('all-chat', chats);
  });

  socket.on('send-message', async (message) => {
    const roomExists = await prisma.chatroom.findUnique({
      where: {
        room: chatRoomVal,
      },
    });
    if (roomExists) {
      const sendMsg = await prisma.message.create({
        data: {
          text: message.text,
          messageId: chatRoomVal,
          username: message.username,
        },
      });
      console.log(sendMsg);
      socket.to(chatRoomVal).emit('receive-message', sendMsg);
    } else {
      const createChatroom = await prisma.chatroom.create({
        data: {
          room: chatRoomVal,
          messages: {
            create: {
              username: message.username,
              text: message.text,
            },
          },
        },
      });
      console.log(createChatroom);
    }
  });
});

app.post('/createchatroom', async (req, res) => {
  const createChatRoom = await prisma.chatroom.create({
    data: {
      room: req.body.room,
    },
  });
  res.status(200).send(createChatRoom);
});

app.get('/getusers', async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.post('/getchat', (req, res) => {
  prisma.chatroom
    .findMany({ where: { room: req.body.room }, include: { messages: true } })
    .then((data) => res.send(data));
});
app.get('/getchatroom', (req, res) => {
  prisma.message.findMany({ include: { chatroom: true } }).then((data) => res.send(data));
});

app.post('/message', async (req, res) => {
  const { text, messageId, username } = req.body;
  const createMessage = await prisma.message.create({
    data: {
      text,
      messageId,
      username,
    },
  });
  res.status(200).send(createMessage);
});

server.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT} 🚀😈🔥`);
});

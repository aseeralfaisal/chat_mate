import express from 'express';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import http from 'http';
const app = express();
const server = http.createServer(app);
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

dotenv.config();

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ msg: 'Hello Dev 🧑‍💻😈' });
});

let interval: string | number | NodeJS.Timeout;
io.on('connection', (socket) => {
  // console.log('New client connected');
  socket.on('msg', (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT} 🚀😈🔥`);
});

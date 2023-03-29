import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat_room')
  async onNewMessage(
    @MessageBody() message: { userName: string; chatRoom: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { chatRoom } = message;
    console.log(message);
    const chatRoomVal = chatRoom;
    socket.join(chatRoomVal);
    const chats = await prisma.chatroom.findMany({
      where: { room: chatRoomVal },
      include: { messages: true },
    });
    console.log('CHATS', chats);
    socket.on('send-message', async (message) => {
      console.log(message);
      const roomExists = await prisma.chatroom.findUnique({
        where: {
          room: chatRoomVal,
        },
      });
      console.log('ROOM EXISTS', roomExists);
      if (roomExists) {
        const sendMsg = await prisma.message.create({
          data: {
            text: message.text,
            messageId: chatRoomVal,
            username: message.username,
          },
        });
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
  }
}

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
    const chats = await prisma.chatroom.findMany({
      where: { room: chatRoom },
      include: { messages: true },
    });
    console.log('CHATS', chats);
    socket.on('send-message', async (message) => {
      console.log(message);
      const roomExists = await prisma.chatroom.findUnique({
        where: { room: chatRoom },
      });
      if (roomExists) {
        const sendMessage = await prisma.message.create({
          data: {
            text: message.text,
            messageId: chatRoom,
            username: message.username,
          },
        });
        const createLastMessage = async (username: string, text: string) => {
          return await prisma.lastMessage.create({
            data: { username, text },
          });
        };
        createLastMessage(message.username, message.text);
        createLastMessage(message.receiver, message.text);
        socket.to(chatRoom).emit('receive-message', sendMessage);
      } else {
        const createChatroom = await prisma.chatroom.create({
          data: {
            room: chatRoom,
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

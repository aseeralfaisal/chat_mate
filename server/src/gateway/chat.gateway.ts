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
    await prisma.chatroom.findMany({
      where: { room: chatRoom },
      include: { messages: true },
    });
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
        socket.to(chatRoom).emit('receive-message', sendMessage);
      } else {
        await prisma.chatroom.create({
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
      }
    });
  }
}

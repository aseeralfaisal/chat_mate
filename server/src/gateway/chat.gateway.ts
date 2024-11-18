import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const roomExistsCache = new Map();

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat_room')
  async onJoinRoom(
    @MessageBody() message: { userName: string; chatRoom: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { chatRoom, userName } = message;
    socket.join(chatRoom);
    socket.data.chatRoom = chatRoom;

    if (!roomExistsCache.has(chatRoom)) {
      const roomExists = await prisma.chatroom.findUnique({
        where: { room: chatRoom },
      });
      if (roomExists) roomExistsCache.set(chatRoom, true);
    }

    return { status: 'joined', chatRoom, userName };
  }

  @SubscribeMessage('send-message')
  async onSendMessage(
    @MessageBody() message: { text: string; username: string },
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const { text, username } = message;
      const chatRoom = socket.data.chatRoom;
      this.server.to(chatRoom).emit('receive-message', message);

      let roomExists = roomExistsCache.get(chatRoom);

      if (!roomExists) {
        const room = await prisma.chatroom.findUnique({
          where: { room: chatRoom },
        });

        roomExists = !!room;
        roomExistsCache.set(chatRoom, roomExists);
      }

      if (roomExists) {
        await prisma.message.create({
          data: {
            text,
            messageId: chatRoom,
            username,
          },
        });
      } else {
        await prisma.chatroom.create({
          data: {
            room: chatRoom,
            messages: {
              create: {
                username,
                text,
              },
            },
          },
          include: {
            messages: true,
          },
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  }
}

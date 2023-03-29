import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getChat({ room }: { room: string }): Promise<object> {
    const response = await prisma.chatroom.findMany({
      where: { room },
      include: { messages: true },
    });
    return response;
  }
  async getChatRoom() {
    const chatroom = await prisma.chatroom.findMany();
    console.log(chatroom);
    return chatroom;
  }
  async createChatRoom(data: any) {
    const createChatRoom = await prisma.chatroom.create({
      data: {
        room: data.room,
      },
    });
    return createChatRoom;
  }
  async login(data: any) {
    const { username, password } = data;
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (userExists) {
      if (userExists.password === password) {
        return 'Login successful';
      } else {
        return 'Wrong password';
      }
    }
  }
  async register(data: any) {
    const { username, password } = data;
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    //409: already exists
    if (userExists) return 'User already exist';
    const register = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    if (register) {
      return 'Registration successful';
    }
  }
  async getUsers() {
    const users = await prisma.user.findMany();
    const userlist = users.filter((user) => delete user['password']);
    return userlist;
  }
}

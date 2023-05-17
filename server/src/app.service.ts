import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, chatroom, user } from '@prisma/client';
import bcrypt from 'bcrypt';

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

  async getChatRoom(): Promise<chatroom[]> {
    const chatroom = await prisma.chatroom.findMany();
    return chatroom;
  }

  async createChatRoom(data: any): Promise<chatroom> {
    const createChatRoom = await prisma.chatroom.create({
      data: {
        room: data.room,
      },
    });
    return createChatRoom;
  }

  async login(data: { username: string; password: string }) {
    const { username, password } = data;
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!userExists) return 'Wrong password';
    if (userExists.password === password) {
      return 'Login successful';
    }
  }

  async registerUser(data: { username: string; password: string }) {
    try {
      const { username, password } = data;

      const userExists = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userExists) {
        throw new HttpException('User already exist', HttpStatus.CONFLICT);
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await prisma.user.create({
        data: {
          username,
          password: hashPassword,
        },
      });

      return 'Registration successful';
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(): Promise<user[]> {
    const users = await prisma.user.findMany();
    const userlist = users.filter((user) => delete user['password']);
    return userlist;
  }
}

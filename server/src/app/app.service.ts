import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, chatroom, user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

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
    try {
      const { username, password } = data;
      const userPresent = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!userPresent) return 'Wrong password';
      const comparePassword = await bcrypt.compare(
        password,
        userPresent.password,
      );
      if (!comparePassword)
        throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
      return AuthService.generateAccessToken(username);
    } catch (error) {
      console.log(error);
    }
  }

  async registerUser(data: { username: string; password: string }) {
    try {
      const { username, password } = data;

      const userPresent = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userPresent) {
        throw new HttpException('User already exist', HttpStatus.CONFLICT);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const createdUser = await prisma.user.create({
        data: {
          username,
          password: hashedPass,
        },
      });

      return createdUser;
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
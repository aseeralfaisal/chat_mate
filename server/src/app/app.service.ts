import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, chatroom, user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getTest() {
    return 'Hello World';
  }
  async getChat({ room }: { room: string }): Promise<chatroom[]> {
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

  async login(data: { username: string; password: string }): Promise<any> {
    const { username, password } = data;

    const userPresent = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!userPresent)
      throw new HttpException("USER DOESN'T EXIST", HttpStatus.UNAUTHORIZED);

    const comparePassword = await bcrypt.compare(
      password,
      userPresent.password,
    );

    if (!comparePassword)
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);

    const auth = new AuthService();
    const accessToken = auth.generateAccessToken(username);
    const refreshToken = auth.generateRefreshToken(username);
    const csrf = uuid();
    return { accessToken, refreshToken, csrf };
  }

  async registerUser(data: {
    username: string;
    password: string;
  }): Promise<user> {
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

      const salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
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
    try {
      const users = await prisma.user.findMany();
      return users.filter((user) => delete user['password']);
    } catch (error) {
      console.log(error);
    }
  }
}

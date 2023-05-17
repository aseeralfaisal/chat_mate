import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/getchat')
  getChat(@Body() data: { room: string }) {
    return this.appService.getChat(data);
  }

  @Get('/getchatroom')
  getChatRoom() {
    return this.appService.getChatRoom();
  }

  @Post('/createchatroom')
  createChatRoom(@Body() data: { room: string }) {
    return this.appService.createChatRoom(data);
  }

  @Post('/login')
  login(@Body() data: { username: string; password: string }) {
    return this.appService.login(data);
  }

  @Post('/register')
  register(@Body() data: { username: string; password: string }) {
    return this.appService.registerUser(data);
  }

  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }
}

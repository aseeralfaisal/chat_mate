import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Session } from 'express-session';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  async login(
    @Body() data: { username: string; password: string },
    @Req() request: Request & { session: Session },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, csrf } = await this.appService.login(
      data,
    );
    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });
    response.cookie('username', data.username, { httpOnly: true });
    request.session['csrfToken'] = csrf;
    return { user: data.username, csrf };
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

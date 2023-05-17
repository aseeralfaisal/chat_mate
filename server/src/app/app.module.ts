import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from '../gateway/chat.gateway';
import { AuthService } from '../auth/auth.service';
import * as cookieParser from 'cookie-parser';
import { authMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventsGateway, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*')
      .apply(authMiddleware)
      .forRoutes('*');
  }
}

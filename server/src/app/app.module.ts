import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from '../gateway/chat.gateway';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventsGateway, AuthService],
})
export class AppModule {}

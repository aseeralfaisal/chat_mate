import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  app.use(cookieParser());
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(PORT);
  console.log(`Server is listening to http://localhost:${PORT}`);
}

bootstrap();

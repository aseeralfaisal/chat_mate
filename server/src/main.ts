import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

const PORT = 3001 || process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  await app.listen(PORT);
  app.use(cookieParser());
  console.log(`Server is listening to http://localhost:${PORT}`);
}
bootstrap();

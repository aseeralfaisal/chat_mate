import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

const PORT = 3001 || process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  await app.listen(PORT);
  app.use(cookieParser());
  app.use(csurf());
  console.log(`Server is listening to http://localhost:${PORT}`);
}
bootstrap();

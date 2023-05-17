import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = 3001 || process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
  console.log(`Server is listening to http://localhost:${PORT}`);
}
bootstrap();

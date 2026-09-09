import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enables integration across domains
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`[EcoTwin-X Gateway] API is executing on: http://localhost:${port}`);
}
bootstrap();

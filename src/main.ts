import { NestFactory } from '@nestjs/core';
import { StreamCalModule } from './stream-cal/stream-cal.module';

async function bootstrap() {
  const app = await NestFactory.create(StreamCalModule);
  await app.listen(3000);
}
bootstrap();

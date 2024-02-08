import { NestFactory } from '@nestjs/core';
import { StreamCalModule } from './stream-cal/stream-cal.module';
import setupDB from './lib/dbOps/setupDB';
import channelModelsGlobal from './global/channelModels';

async function bootstrap() {
  channelModelsGlobal.channelModelsArray = await setupDB();
  const app = await NestFactory.create(StreamCalModule);
  app.enableCors();
  await app.listen(15645);
}
bootstrap();

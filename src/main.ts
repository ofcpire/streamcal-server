import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupDB from './lib/dbOps/setupDB';
import channelModelsGlobal from './global/channelModels';

async function bootstrap() {
  channelModelsGlobal.channelModelsArray = await setupDB();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(15645);
}
bootstrap();

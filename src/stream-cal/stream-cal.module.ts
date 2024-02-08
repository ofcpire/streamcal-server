import { Module } from '@nestjs/common';
import {
  ChannelListController,
  StreamCalController,
} from './stream-cal.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
    }),
  ],
  controllers: [StreamCalController, ChannelListController],
})
export class StreamCalModule {}

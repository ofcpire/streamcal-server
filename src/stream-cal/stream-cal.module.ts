import { Module } from '@nestjs/common';
import {
  ChannelListController,
  StreamCalController,
} from './stream-cal.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [StreamCalController, ChannelListController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
  ],
})
export class StreamCalModule {}

import { Module } from '@nestjs/common';
import {
  ChannelListController,
  StreamCalController,
} from './stream-cal.controller';

@Module({
  controllers: [StreamCalController, ChannelListController],
})
export class StreamCalModule {}

import { Module } from '@nestjs/common';
import { StreamCalController } from './stream-cal.controller';

@Module({
  controllers: [StreamCalController],
})
export class StreamCalModule {}

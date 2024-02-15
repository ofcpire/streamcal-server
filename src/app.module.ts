import { Module } from '@nestjs/common';
import { StreamCalController } from './controller/stream-cal/stream-cal.controller';
import { ChannelListController } from './controller/channel-list/channel-list.controller';
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
export class AppModule {}

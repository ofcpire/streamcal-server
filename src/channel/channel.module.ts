import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelRepository } from './channel.repository';
import { Channel, ChannelSchema } from './channel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelRepository],
  exports: [
    ChannelService,
    ChannelRepository,
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
})
export class ChannelModule {}

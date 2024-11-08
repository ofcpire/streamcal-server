import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from './channel.schema';
import { Model } from 'mongoose';
import { ChannelInfoType } from './channel.interface';

@Injectable()
export class ChannelRepository {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
  ) {}
  async fetchChannelInfoById(channelId: string) {
    return await this.channelModel.findOne({ channelId }).lean();
  }

  async fetchAllChannelInfos(): Promise<ChannelInfoType[]> {
    return await this.channelModel.find({}).lean();
  }
}

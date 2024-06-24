import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from './channel.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChannelRepository {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
  ) {}
  async fetchChannelInfoById(channelId: string) {
    return await this.channelModel.findOne({ channelId }).lean();
  }

  async fetchAllChannelInfos(): Promise<Channel[]> {
    const channelInfos = await this.channelModel.find({}).lean();
    return channelInfos;
  }
}

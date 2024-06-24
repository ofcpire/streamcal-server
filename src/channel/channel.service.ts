import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { ChannelRepository } from './channel.repository';
dayjs.extend(utc);

@Injectable()
export class ChannelService {
  constructor(private readonly channelRepository: ChannelRepository) {}
  private readonly logger = new Logger(ChannelService.name);

  async getAllChannelInfos() {
    return await this.channelRepository.fetchAllChannelInfos();
  }
}

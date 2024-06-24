import { Controller, Get, Query, Logger, Header } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}
  private readonly logger = new Logger(ChannelController.name);

  @Get()
  @Header('Cache-Control', 'max-age=300')
  async sendChnanelList(@Query('page') page: number) {
    const resData = await this.channelService.getAllChannelInfos();
    this.logger.log(`RES channel list length:${resData.length}`);
    return resData;
  }
}

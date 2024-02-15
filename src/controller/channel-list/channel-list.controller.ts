import { Controller, Get, Query, Logger } from '@nestjs/common';
import processChannelList from 'src/lib/dbOps/processChannelList';

@Controller('channel')
export class ChannelListController {
  private readonly logger = new Logger(ChannelListController.name);

  @Get()
  async sendChnanelList(@Query('page') page: number) {
    this.logger.log(`REQ page:${page}`);
    const resData = await processChannelList(page);
    this.logger.log(`RES channel list length:${resData.length}`);
    return resData;
  }
}

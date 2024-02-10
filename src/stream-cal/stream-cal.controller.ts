import { Controller, Get, Param, Query, Logger } from '@nestjs/common';
import loadLogByIdAndDate from 'src/lib/dbOps/loadLogByIdAndDate';
import processChannelList from 'src/lib/dbOps/processChannelList';

@Controller('streamcal')
export class StreamCalController {
  private readonly logger = new Logger(StreamCalController.name);

  @Get('/:channelId')
  async sendStreamCalById(
    @Param('channelId') channelId: string,
    @Query('date') date: string,
  ) {
    this.logger.log(`REQ channelId: ${channelId} date:${date}`);
    const resData = await loadLogByIdAndDate(channelId, date);
    this.logger.log(
      `RES targetDate:${resData.metadata.targetDate} updating:${resData.metadata.updating} logLength:${resData.log.length}`,
    );
  }
}

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

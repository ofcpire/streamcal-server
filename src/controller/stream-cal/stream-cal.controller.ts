import { Controller, Get, Param, Query, Logger } from '@nestjs/common';
import loadLogByIdAndDate from 'src/lib/dbOps/loadLogByIdAndDate';

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
    return resData;
  }
}

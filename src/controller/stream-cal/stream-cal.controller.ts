import {
  Controller,
  Get,
  Param,
  Query,
  Logger,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import loadLogByIdAndDate from 'src/lib/dbOps/loadLogByIdAndDate';

@Controller('streamcal')
export class StreamCalController {
  private readonly logger = new Logger(StreamCalController.name);
  @Get('/:channelId')
  async sendStreamCalById(
    @Response() res: Res,
    @Param('channelId') channelId: string,
    @Query('date') date: string,
  ) {
    this.logger.log(`REQ channelId: ${channelId} date:${date}`);
    const resData = await loadLogByIdAndDate(channelId, date);
    const cache = resData.metadata.updating
      ? 60 * 1000
      : 30 * 24 * 60 * 60 * 1000;
    this.logger.log(
      `RES targetDate:${resData.metadata.targetDate} updating:${resData.metadata.updating} logLength:${resData.log.length}`,
    );
    res.set({ 'Cache-Control': `max-age=${cache}` }).json(resData);
    return res;
  }
}

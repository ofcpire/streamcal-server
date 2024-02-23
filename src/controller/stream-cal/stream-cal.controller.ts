import {
  Controller,
  Get,
  Param,
  Query,
  Logger,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import loadLogByIdAndDate from 'src/lib/dbOps/streamcal/loadLogByIdAndDate';
import loadMonthLogByIdAndDate from 'src/lib/dbOps/streamcal/loadMonthLogByIdAndDate';
import processChannelInfo from 'src/lib/utils/processChannelInfo';
import findChannelAndModel from 'src/lib/utils/streamcal/findChannelAndModel';
import queryDateToDate from 'src/lib/utils/streamcal/queryDateToDate';

@Controller('streamcal')
export class StreamCalController {
  private readonly logger = new Logger(StreamCalController.name);
  @Get('/:channelId')
  async sendStreamCalById(
    @Response() res: Res,
    @Param('channelId') channelId: string,
    @Query('date') date: string,
    @Query('type') type: string,
  ) {
    this.logger.log(`REQ channelId: ${channelId} date:${date} type:${type}`);
    const targetDate = queryDateToDate(date);
    const channelInfo = await findChannelAndModel(channelId);
    const resData =
      type === 'month'
        ? await loadMonthLogByIdAndDate(channelId, targetDate)
        : await loadLogByIdAndDate(channelId, targetDate);
    resData['channelInfo'] = processChannelInfo(channelInfo);
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

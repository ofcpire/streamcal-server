import {
  Controller,
  Get,
  Param,
  Query,
  Logger,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { StreamcalService } from './streamcal.service';

@Controller('streamcal')
export class StreamcalController {
  constructor(private readonly streamcalService: StreamcalService) {}
  private readonly logger = new Logger(StreamcalController.name);

  @Get('/:channelId')
  async sendStreamCalById(
    @Response() res: Res,
    @Param('channelId') channelId: string,
    @Query('date') date: string,
    @Query('type') type: string,
  ) {
    const resData =
      type === 'month'
        ? await this.streamcalService.loadMonthLogByIdAndDate(channelId, date)
        : await this.streamcalService.loadLogByIdAndDate(channelId, date);
    const cache = resData.metadata.updating ? 60 * 1000 : 5 * 60 * 1000;
    this.logger.log(
      `RES targetDate:${resData.metadata.targetDate} updating:${resData.metadata.updating} logLength:${resData.log.length}`,
    );
    res.set({ 'Cache-Control': `max-age=${cache}` }).json(resData);
    return res;
  }
}

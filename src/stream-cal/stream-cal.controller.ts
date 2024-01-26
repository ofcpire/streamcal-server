import { Controller, Get, Param, Query } from '@nestjs/common';
import loadLogByIdAndDate from 'src/lib/dbOps/loadLogByIdAndDate';
import processChannelList from 'src/lib/dbOps/processChannelList';

@Controller('streamcal')
export class StreamCalController {
  @Get('/:channelId')
  async sendStreamCalById(
    @Param('channelId') channelId: string,
    @Query('date') date: string,
  ) {
    return await loadLogByIdAndDate(channelId, date);
  }
}

@Controller('channel')
export class ChannelListController {
  @Get()
  async sendChnanelList(@Query('page') page: number) {
    return await processChannelList(page);
  }
}

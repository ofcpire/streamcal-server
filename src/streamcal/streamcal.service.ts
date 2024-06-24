import { Logger, Injectable, BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { StreamcalRepository } from './streamcal.repository';
import { ChannelLogType } from './streamcal.interface';
import { CategoryRepository } from 'src/category/category.repository';
import { ChannelRepository } from 'src/channel/channel.repository';

@Injectable()
export class StreamcalService {
  constructor(
    private readonly streamcalRepository: StreamcalRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly channelRepository: ChannelRepository,
  ) {}
  private readonly logger = new Logger(StreamcalService.name);

  private queryDateToDateObj(queryDate: string) {
    const nowDate = dayjs();
    const targetDate = queryDate || nowDate.startOf('day').toISOString();
    return dayjs(targetDate);
  }
  // async loadAllLogById(channelId: string) {}

  async loadLogByIdAndDate(channelId: string, date: string) {
    const serverTime = dayjs();
    const dateObj = this.queryDateToDateObj(date);
    try {
      const channelLogByDate =
        await this.streamcalRepository.fetchDateLogByIdAndDate(
          channelId,
          dateObj,
        );
      const liveCategories =
        await this.categoryRepository.fetchLiveCategoryArrayByCategories(
          this.extractLiveCategoriesFromLog(channelLogByDate),
        );
      const filteredChannelLogByDate = channelLogByDate.map((log) => {
        const existLiveCategory = liveCategories.find(
          (categoryObj) => categoryObj.liveCategory === log.liveCategory,
        );
        if (!existLiveCategory) return log;
        else if (log.liveCategoryValue !== existLiveCategory.liveCategoryValue)
          log.liveCategoryValue = existLiveCategory.liveCategoryValue;
        return log;
      });
      return {
        metadata: {
          type: 'date',
          targetDate: dateObj.format('YYYY-MM-DD'),
          updating: serverTime.isSame(dateObj, 'day') ? true : false,
          serverTime: serverTime.toISOString(),
        },
        channelInfo:
          await this.channelRepository.fetchChannelInfoById(channelId),
        log: filteredChannelLogByDate,
      };
    } catch (err) {
      console.error(err);
      this.logger.error(err);
      throw new BadRequestException();
    }
  }

  async loadMonthLogByIdAndDate(channelId: string, date: string) {
    const serverTime = dayjs();
    const dateObj = this.queryDateToDateObj(date);
    try {
      const channelLogByMonth =
        await this.streamcalRepository.fetchMonthLogByIdAndDate(
          channelId,
          dateObj,
        );
      const liveCategories =
        await this.categoryRepository.fetchLiveCategoryArrayByCategories(
          this.extractLiveCategoriesFromLog(channelLogByMonth),
        );
      const filteredChannelLog = channelLogByMonth
        .filter((log) => {
          if (dayjs(log.timestamp).date() === 1) return true;
          else
            return !(
              dayjs(log.timestamp).hour() === 0 &&
              dayjs(log.timestamp).minute() === 0
            );
        })
        .map((log) => {
          const existLiveCategory = liveCategories.find(
            (categoryObj) => categoryObj.liveCategory === log.liveCategory,
          );
          if (!existLiveCategory) return log;
          else if (
            log.liveCategoryValue !== existLiveCategory.liveCategoryValue
          )
            log.liveCategoryValue = existLiveCategory.liveCategoryValue;
          return log;
        });

      return {
        metadata: {
          type: 'month',
          targetDate: dateObj.format('YYYY-MM-DD'),
          updating: serverTime.isSame(dateObj, 'month') ? true : false,
          serverTime: serverTime.toISOString(),
        },
        channelInfo:
          await this.channelRepository.fetchChannelInfoById(channelId),
        log: filteredChannelLog,
      };
    } catch (err) {
      this.logger.error(err);
      throw new Error('Bad Request');
    }
  }

  private extractLiveCategoriesFromLog(channelLog: ChannelLogType[]) {
    return channelLog.map((log) => log.liveCategory);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Streamcal, StreamcalSchema } from './streamcal.schema';
import { ChannelLogType } from './streamcal.interface';
import { Connection } from 'mongoose';
import dayjs from 'dayjs';

@Injectable()
export class StreamcalRepository {
  constructor(@InjectConnection() private connection: Connection) {}

  async fetchDateLogByIdAndDate(
    channelId: string,
    date: dayjs.Dayjs,
  ): Promise<ChannelLogType[]> {
    const channelModel = this.getModelById(channelId);
    return await channelModel
      .find({
        timestamp: {
          $gte: date.valueOf(),
          $lt: date.valueOf() + 24 * 60 * 60000,
        },
      })
      .lean();
  }

  async fetchMonthLogByIdAndDate(
    channelId: string,
    date: dayjs.Dayjs,
  ): Promise<ChannelLogType[]> {
    const channelModel = this.getModelById(channelId);
    return await channelModel
      .find({
        timestamp: {
          $gte: date.startOf('month').valueOf(),
          $lt: date.endOf('month').valueOf(),
        },
      })
      .lean();
  }

  private getModelById(channelId: string) {
    const savedChannelModel =
      this.channelModels.length > 0 &&
      this.channelModels.find((modelObj) => modelObj.channelId === channelId);
    if (savedChannelModel) return savedChannelModel.channelModel;
    else {
      const channelModel = this.connection.model<Streamcal>(
        channelId,
        StreamcalSchema,
        channelId,
      );
      this.channelModels.push({
        channelId,
        channelModel,
      });
      return channelModel;
    }
  }

  private channelModels = [];
}

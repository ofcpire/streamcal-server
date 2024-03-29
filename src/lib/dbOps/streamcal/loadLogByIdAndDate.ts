import channelModelsGlobal from 'src/global/channelModels';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { Logger } from '@nestjs/common';
const logger = new Logger('loadLogByIdAndDate');
dayjs.extend(utc);

const loadLogByIdAndDate = async (
  channelId: string,
  targetDate: dayjs.Dayjs,
) => {
  const serverTime = dayjs();
  try {
    const channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    const channelLogByDate = (await channelModelObjById.channelModel.find({
      timestamp: {
        $gte: targetDate.valueOf(),
        $lt: targetDate.valueOf() + 24 * 60 * 60000,
      },
    })) as ChannelLogType[];
    return {
      metadata: {
        type: 'date',
        targetDate: targetDate.format('YYYY-MM-DD'),
        updating: serverTime.isSame(targetDate, 'day') ? true : false,
        serverTime: serverTime.toISOString(),
      },
      log: channelLogByDate,
    };
  } catch (err) {
    logger.error(err);
    throw new Error('Bad Request');
  }
};

export default loadLogByIdAndDate;

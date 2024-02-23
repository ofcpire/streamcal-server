import channelModelsGlobal from 'src/global/channelModels';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { Logger } from '@nestjs/common';
const logger = new Logger('loadMonthLogByIdAndDate');
dayjs.extend(utc);

const loadMonthLogByIdAndDate = async (
  channelId: string,
  targetDate: dayjs.Dayjs,
) => {
  const serverTime = dayjs();
  try {
    const channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    const channelLogByMonth = (await channelModelObjById.channelModel.find({
      timestamp: {
        $gte: targetDate.startOf('month').valueOf(),
        $lt: targetDate.endOf('month').valueOf(),
      },
    })) as ChannelLogType[];
    const filteredChannelLog = channelLogByMonth.filter(
      (log) =>
        !(
          dayjs(log.timestamp).hour() === 0 &&
          dayjs(log.timestamp).minute() === 0
        ),
    );
    return {
      metadata: {
        type: 'month',
        targetDate: targetDate.format('YYYY-MM-DD'),
        updating: serverTime.isSame(targetDate, 'month') ? true : false,
        serverTime: serverTime.toISOString(),
      },
      log: filteredChannelLog,
    };
  } catch (err) {
    logger.error(err);
    throw new Error('Bad Request');
  }
};

export default loadMonthLogByIdAndDate;
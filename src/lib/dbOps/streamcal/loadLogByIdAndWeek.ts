import channelModelsGlobal from 'src/global/channelModels';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { Logger } from '@nestjs/common';
const logger = new Logger('loadLogByIdAndWeek');
dayjs.extend(utc);

const loadLogByIdAndWeek = async (
  channelId: string,
  targetDate: dayjs.Dayjs,
) => {
  try {
    const channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    const channelLogByDate = await channelModelObjById.channelModel.find({
      timestamp: {
        $gte: targetDate.valueOf() - 7 * 24 * 60 * 60000,
        $lt: targetDate.valueOf(),
      },
    });
    return {
      metadata: {
        targetDate: targetDate.format('YYYY-MM-DD'),
        updating: dayjs().diff(targetDate, 'd') === 0 ? true : false,
      },
      log: channelLogByDate,
    };
  } catch (err) {
    logger.error(err);
    throw new Error('Bad Request');
  }
};

export default loadLogByIdAndWeek;

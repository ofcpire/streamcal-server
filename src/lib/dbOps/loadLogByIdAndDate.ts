import channelModelsGlobal from 'src/global/channelModels';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import loadChannelList from './loadChannelList';
dayjs.extend(utc);

const loadLogByIdAndDate = async (channelId: string, date: string) => {
  const isChannelExist = (await loadChannelList()).some(
    (channelInfo) => channelInfo.channelId === channelId,
  );
  try {
    if (!isChannelExist) throw new Error('Unknown Channel ID');
    const targetDate = date || dayjs().startOf('day').toISOString();
    console.log(targetDate);
    const channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    const targetDateObj = dayjs(targetDate);

    const channelLogByDate = await channelModelObjById.channelModel.find({
      timestamp: {
        $gte: targetDateObj.valueOf(),
        $lt: targetDateObj.valueOf() + 24 * 60 * 60000,
      },
    });
    return channelLogByDate;
  } catch (err) {
    console.log(err);
    throw new Error('Bad Request');
  }
};

export default loadLogByIdAndDate;

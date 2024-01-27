import channelModelsGlobal from 'src/global/channelModels';
import createAndPushNewChannelModel from './createAndPushNewChannelModel';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import loadChannelList from './loadChannelList';
dayjs.extend(utc);

const loadLogByIdAndDate = async (channelId: string, date: string) => {
  const channelInfo = (await loadChannelList()).find(
    (channelInfo) => channelInfo.channelId === channelId,
  );
  try {
    if (!channelInfo) throw new Error('Unknown Channel ID');
    const targetDate = date || dayjs().startOf('day').toISOString();
    console.log(targetDate);
    let channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    if (channelInfo && !channelModelObjById) {
      const newChannelModelObj =
        await createAndPushNewChannelModel(channelInfo);
      if (newChannelModelObj) channelModelObjById = newChannelModelObj;
      else
        throw new Error(
          `Unknown Case: Channel ${channelInfo.channelName}(${channelInfo.channelId}) Info exist, but failed to create model`,
        );
    }
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

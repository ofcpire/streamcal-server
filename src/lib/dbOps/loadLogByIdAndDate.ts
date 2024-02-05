import channelModelsGlobal from 'src/global/channelModels';
import createAndPushNewChannelModel from './createAndPushNewChannelModel';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import loadChannelList from './loadChannelList';
import processChannelInfo from '../utils/processChannelInfo';
dayjs.extend(utc);

const loadLogByIdAndDate = async (channelId: string, date: string) => {
  const channelInfo = (await loadChannelList()).find(
    (channelInfo) => channelInfo.channelId === channelId,
  );
  try {
    if (!channelInfo) throw new Error('Unknown Channel ID');

    const nowDate = dayjs();
    const targetDate = date || nowDate.startOf('day').toISOString();
    const targetDateObj = dayjs(targetDate);
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
    const updating = nowDate.diff(targetDateObj, 'd') === 0 ? true : false;
    const channelLogByDate = await channelModelObjById.channelModel.find({
      timestamp: {
        $gte: targetDateObj.valueOf(),
        $lt: targetDateObj.valueOf() + 24 * 60 * 60000,
      },
    });
    return {
      metadata: {
        targetDate: targetDateObj.format('YYYY-MM-DD'),
        updating,
      },
      channelInfo: processChannelInfo(channelInfo),
      log: channelLogByDate,
    };
  } catch (err) {
    console.log(err);
    throw new Error('Bad Request');
  }
};

export default loadLogByIdAndDate;

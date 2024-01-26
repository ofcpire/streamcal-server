import connectDB from '../dbBase/connectDB';
import createModelByInfo from './createModelByInfo';
import loadChannelList from './loadChannelList';

const setupDB = async () => {
  await connectDB('streamcal');
  const channelInfoList = await loadChannelList();
  const channelModels = [];
  for (const channelInfo of channelInfoList) {
    const channelModelObj = {
      channelId: channelInfo.channelId,
      channelModel: createModelByInfo(channelInfo),
    };
    channelModels.push(channelModelObj);
  }
  return channelModels;
};

export default setupDB;

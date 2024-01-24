import { channelInfoModel } from './db/models.js';

const loadChannelList = async () => {
  const channelInfos = await channelInfoModel.find({});
  console.log(`Loaded Channel Info Count: ${channelInfos.length}`);
  return channelInfos;
};

export default loadChannelList;

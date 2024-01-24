import { channelInfoModel } from '../dbBase/models.js';

const loadChannelList = async (): Promise<ChannelInfoType[]> => {
  const channelInfos = (await channelInfoModel.find({})) as ChannelInfoType[];
  console.log(`Loaded Channel Info Count: ${channelInfos.length}`);
  return channelInfos;
};

export default loadChannelList;

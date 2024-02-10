import { channelInfoModel } from '../dbBase/models.js';
import { Logger } from '@nestjs/common';
const logger = new Logger('loadChannelList');

const loadChannelList = async (): Promise<ChannelInfoType[]> => {
  const channelInfos = (await channelInfoModel.find({})) as ChannelInfoType[];
  logger.log(`Loaded Channel Info Count: ${channelInfos.length}`);
  return channelInfos;
};

export default loadChannelList;

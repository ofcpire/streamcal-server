import processChannelInfo from '../utils/processChannelInfo';
import loadChannelList from './loadChannelList';

const processChannelList = async (page: number = 1) => {
  console.log(page);
  const channelInfos = await loadChannelList();
  const processedChannelInfos = channelInfos.map(
    (channelInfo: ChannelInfoType) => {
      return processChannelInfo(channelInfo);
    },
  );
  return processedChannelInfos;
};

export default processChannelList;

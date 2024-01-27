import loadChannelList from './loadChannelList';

const processChannelList = async (page: number = 1) => {
  console.log(page);
  const channelInfos = await loadChannelList();
  const processedChannelInfos = channelInfos.map(
    (channelInfo: ChannelInfoType) => {
      return {
        channelId: channelInfo.channelId,
        channelName: channelInfo.channelName,
        channelType: channelInfo.channelType,
        verifiedMark: channelInfo.verifiedMark,
      };
    },
  );
  return processedChannelInfos;
};

export default processChannelList;

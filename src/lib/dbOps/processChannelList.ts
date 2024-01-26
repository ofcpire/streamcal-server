import loadChannelList from './loadChannelList';

const processChannelList = async (page: number = 1) => {
  console.log(page);
  const channelInfos = await loadChannelList();
  const response = {
    statusCode: null,
    message: null,
    data: null,
  };
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
  response.data = processedChannelInfos;
  response.statusCode = 200;
  return response;
};

export default processChannelList;

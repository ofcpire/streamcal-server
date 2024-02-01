const processChannelInfo = (channelInfo: ChannelInfoType) => {
  return {
    channelId: channelInfo.channelId,
    channelName: channelInfo.channelName,
    channelType: channelInfo.channelType,
    verifiedMark: channelInfo.verifiedMark,
    createdAt: channelInfo.createdAt,
  };
};

export default processChannelInfo;

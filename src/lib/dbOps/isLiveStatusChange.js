const isLiveStatusChange = async (
  channelId,
  liveStatusModel,
  liveStatusData,
) => {
  const lastLiveStatus = await liveStatusModel.findOne(
    {},
    {},
    { sort: { timestamp: -1 } },
  );
  //lastLiveStatus가 없으면 true
  if (!lastLiveStatus) return true;
  //liveTitle, liveCategory, status가 바뀌면 true
  else if (
    liveStatusData.liveTitle !== lastLiveStatus.liveTitle ||
    liveStatusData.liveCategory !== lastLiveStatus.liveCategory ||
    liveStatusData.status !== lastLiveStatus.status
  ) {
    console.log(`Live Status Update: ${channelId} `);
    return true;
  } else {
    return false;
  }
};

export default isLiveStatusChange;

const saveLiveStatus = async (channelId, liveStatusModel, liveStatusData) => {
  console.log(`Start Save Live Status: ${channelId}`);
  // const liveStatusModel = mongoose.model(
  //   'liveStatus',
  //   LiveStatusSchema,
  //   channelId
  // );

  const date = new Date();
  const liveStatusDBObj = {
    channelId: channelId,
    liveTitle: liveStatusData.liveTitle,
    status: liveStatusData.status,
    liveCategory: liveStatusData.liveCategory,
    liveCategoryValue: liveStatusData.liveCategoryValue,
    timestamp: date.toISOString(),
  };

  console.log(liveStatusDBObj);

  const liveStatusClass = new liveStatusModel(liveStatusDBObj);
  liveStatusClass
    .save()
    .then(() => {
      console.log(liveStatusClass);
    })
    .catch((err) => {
      console.log('Error : ' + err);
    });
};

export default saveLiveStatus;

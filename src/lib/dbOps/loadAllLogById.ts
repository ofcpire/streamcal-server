import channelModelsGlobal from 'src/global/channelModels';

const loadAllLogById = async (channelId: string) => {
  const channelModelObjById = channelModelsGlobal.channelModelsArray.find(
    (obj) => obj.channelId === channelId,
  );
  const channelLog = await channelModelObjById.channelModel.find({});
  return channelLog;
};

export default loadAllLogById;

import createModelByInfo from './createModelByInfo';
import channelModelsGlobal from 'src/global/channelModels';

const createAndPushNewChannelModel = async (channelInfo: ChannelInfoType) => {
  const isChannelModelExist = channelModelsGlobal.channelModelsArray.some(
    (channelModelObj) => channelModelObj.channelId === channelInfo.channelId,
  );
  if (isChannelModelExist) return false;
  const channelModelObj = {
    channelId: channelInfo.channelId,
    channelModel: createModelByInfo(channelInfo),
  };
  channelModelsGlobal.channelModelsArray.push(channelModelObj);
  return channelModelObj;
};

export default createAndPushNewChannelModel;

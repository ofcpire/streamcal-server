import channelModelsGlobal from 'src/global/channelModels';
import createAndPushNewChannelModel from 'src/lib/dbOps/createAndPushNewChannelModel';
import loadChannelList from 'src/lib/dbOps/loadChannelList';

const findChannelAndModel = async (channelId: string) => {
  try {
    const channelInfo = (await loadChannelList()).find(
      (channelInfo) => channelInfo.channelId === channelId,
    );
    if (!channelInfo) throw new Error('Unknown Channel ID');
    let channelModelObjById = channelModelsGlobal.channelModelsArray.find(
      (obj) => obj.channelId === channelId,
    );
    if (channelInfo && !channelModelObjById) {
      const newChannelModelObj =
        await createAndPushNewChannelModel(channelInfo);
      if (newChannelModelObj) channelModelObjById = newChannelModelObj;
      else
        throw new Error(
          `Unknown Case: Channel ${channelInfo.channelName}(${channelInfo.channelId}) Info exist, but failed to create model`,
        );
    }
    return channelInfo;
  } catch (err) {
    throw new Error(err);
  }
};

export default findChannelAndModel;

export interface ChannelModelObjType {
  channelId: string;
  channelModel: any;
}

interface ChannelModelsGlobalType {
  channelModelsArray: null | ChannelModelObjType[];
}

const channelModelsGlobal: ChannelModelsGlobalType = {
  channelModelsArray: null,
};

export default channelModelsGlobal;

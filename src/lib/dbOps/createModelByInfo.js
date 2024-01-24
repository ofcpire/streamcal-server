import mongoose from 'mongoose';
import { LiveStatusSchema } from './db/schema.js';

//각 채널 별 live status 모델을 만드는 함수
const createModelByInfo = (channelInfo) => {
  console.log(
    `Start Create Model - ${channelInfo.channelName}(${channelInfo.channelId})`
  );
  const channelInfoModel = mongoose.model(
    'liveStatus',
    LiveStatusSchema,
    channelInfo.channelId
  );
  return channelInfoModel;
};

export default createModelByInfo;

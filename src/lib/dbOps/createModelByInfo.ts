import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import { LiveStatusSchema } from '../dbBase/schema.js';
const logger = new Logger('createModelByInfo');

//각 채널 별 live status 모델을 만드는 함수
const createModelByInfo = (channelInfo: ChannelInfoType) => {
  logger.log(
    `Start Create Model - ${channelInfo.channelName}(${channelInfo.channelId})`,
  );
  const channelInfoModel = mongoose.model(
    'liveStatus',
    LiveStatusSchema,
    channelInfo.channelId,
  );
  return channelInfoModel;
};

export default createModelByInfo;

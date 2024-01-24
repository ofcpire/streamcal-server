import mongoose from 'mongoose';
import { ChannelInfoSchema } from './schema.js';

//채널 정보 모델
export const channelInfoModel = mongoose.model(
  'channelInfo',
  ChannelInfoSchema,
  'channelInfos',
);

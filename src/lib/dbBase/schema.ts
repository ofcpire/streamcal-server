import mongoose from 'mongoose';

// SET SCHEMA
export const LiveStatusSchema = new mongoose.Schema(
  {
    channelId: String,
    liveTitle: String,
    status: String,
    liveCategory: String,
    liveCategoryValue: String,
    timestamp: Date,
  },
  {
    timeseries: {
      timeField: 'timestamp',
      granularity: 'minutes',
    },
  },
);

export const ChannelInfoSchema = new mongoose.Schema({
  channelId: String,
  channelName: String,
  channelImageUrl: String,
  channelType: String,
  followerCount: Number,
  verifiedMark: Boolean,
  createdAt: String,
});

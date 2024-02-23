interface ChannelInfoType {
  _id: string;
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  verifiedMark: boolean;
  channelType: string;
  channelDescription: string;
  followerCount: number;
  openLive: boolean;
  createdAt: string;
}

interface ChannelInfoSchemaType {
  channelId: string;
  liveTitle: string;
  status: string;
  liveCategory: string;
  liveCategoryValue: string;
  timestamp: string;
}

interface ChannelLogType {
  channelId: string;
  liveTitle: string;
  status: string;
  liveCategory: string;
  liveCategoryValue: string;
  timestamp: string;
}

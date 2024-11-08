export interface liveCategoryObjType {
  liveCategory: string;
  liveCategoryValue: string;
  lastPlayedAt: string;
  players: [
    {
      channelId: string;
      playedAt: string;
    },
  ];
}

import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { ChannelRepository } from 'src/channel/channel.repository';
import { ChannelInfoType } from 'src/channel/channel.interface';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly channelRepository: ChannelRepository,
  ) {}
  // async loadChannelByCategory(category: string, period = 7) {
  //   const string = `Category: ${category} Period: ${period}`;
  //   return string;
  // }
  async loadCategoryDetailByLiveCategory(liveCategory: string) {
    const data =
      await this.categoryRepository.fetchCategoryDetailByLiveCategory(
        liveCategory,
      );
    if (data.players) {
      const channelList = await this.channelRepository.fetchAllChannelInfos();
      const channelMap = new Map<string, ChannelInfoType>();
      for (const channel of channelList) {
        channelMap.set(channel.channelId, channel);
      }
      for (const player of data.players) {
        const channelInfo = channelMap.get(player.channelId);
        player['channelInfo'] = channelInfo || null;
      }
    }
    data.players.reverse();
    return data;
  }

  async loadCategoryListByKeywordAndPage(
    page: number = 1,
    keyword: string | undefined,
    pageSize: number = 50,
  ) {
    const categoryList =
      await this.categoryRepository.fetchCategoryListByPageAndKeyword(
        page,
        keyword,
        pageSize,
      );
    const documentCount = await this.categoryRepository.countCategoryLength();
    return {
      categoryList,
      metadata: {
        pageSize,
        documentCount,
        page,
      },
    };
  }
}

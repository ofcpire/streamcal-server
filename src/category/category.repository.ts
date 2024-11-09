import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LiveCategory } from './category.schema';
import { Model } from 'mongoose';
import { liveCategoryObjType } from './category.interface';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(LiveCategory.name)
    private liveCategoryModel: Model<LiveCategory>,
  ) {}

  async fetchLiveCategoryArrayByCategories(
    categories: string[],
  ): Promise<liveCategoryObjType[]> {
    const query = {
      liveCategory: { $in: categories },
    };
    return await this.liveCategoryModel.find(query).lean();
  }

  async fetchCategoryDetailByLiveCategory(
    liveCategory: string,
  ): Promise<liveCategoryObjType> {
    const query = {
      liveCategory: { $regex: `^${liveCategory}$`, $options: 'i' },
    };
    return await this.liveCategoryModel.findOne(query).lean();
  }

  async fetchCategoryListByPageAndKeyword(
    page: number,
    keyword: string | undefined,
    pageSize: number = 50,
  ): Promise<liveCategoryObjType[]> {
    const query = keyword
      ? {
          liveCategoryValue: { $regex: keyword, $options: 'i' },
        }
      : {};
    return await this.liveCategoryModel
      .find(query)
      .select('lastPlayedAt liveCategory liveCategoryValue')
      .sort({ lastPlayedAt: -1 })
      .skip((page - 1) * pageSize) // 페이지에 맞게 항목 건너뛰기
      .limit(pageSize)
      .lean();
  }

  async countAllCategoryLength() {
    const count = await this.liveCategoryModel.countDocuments();
    return count;
  }
  async countCategoryLengthByKeyword(keyword: string) {
    const count = await this.liveCategoryModel.countDocuments({
      liveCategory: keyword,
    });
    return count;
  }
}

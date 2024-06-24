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
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { LiveCategory, LiveCategorySchema } from './category.schema';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LiveCategory.name, schema: LiveCategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [
    CategoryService,
    CategoryRepository,
    MongooseModule.forFeature([
      { name: LiveCategory.name, schema: LiveCategorySchema },
    ]),
  ],
})
export class CategoryModule {}

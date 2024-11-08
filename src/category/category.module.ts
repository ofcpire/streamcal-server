import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { LiveCategory, LiveCategorySchema } from './category.schema';
import { CategoryRepository } from './category.repository';
import { ChannelRepository } from 'src/channel/channel.repository';
import { Channel, ChannelSchema } from 'src/channel/channel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LiveCategory.name, schema: LiveCategorySchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, ChannelRepository],
  exports: [
    CategoryService,
    CategoryRepository,
    MongooseModule.forFeature([
      { name: LiveCategory.name, schema: LiveCategorySchema },
    ]),
  ],
})
export class CategoryModule {}

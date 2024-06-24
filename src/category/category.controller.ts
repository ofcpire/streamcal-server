import { Controller, Get, Query, Param, Logger } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  private readonly logger = new Logger(CategoryController.name);

  @Get('/:category')
  async sendChnanelList(
    @Param('category') category: string,
    @Query('period') period: number,
  ) {
    const resData = this.categoryService.loadChannelByCategory(
      category,
      period,
    );
    this.logger.log(`RES ${resData}`);
    return resData;
  }
}

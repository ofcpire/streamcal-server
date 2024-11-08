import {
  Controller,
  Get,
  Query,
  Param,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { plainToClass } from 'class-transformer';
import { CategoryListDto } from './dto/category.dto';
import { ClassSerializerInterceptor } from '@nestjs/common';

@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  private readonly logger = new Logger(CategoryController.name);

  @Get('')
  async sendChnanelList(
    @Query('page') page: number,
    @Query('keyword') keyword: string,
    @Query('pageSize') pageSize: number,
  ) {
    const resData = await this.categoryService.loadCategoryListByKeywordAndPage(
      page,
      keyword,
      pageSize,
    );
    this.logger.log(`RES ${resData} length:${resData.categoryList.length}`);
    return plainToClass(CategoryListDto, resData);
  }

  @Get('/:category')
  async sendChnanelDetail(@Param('category') category: string) {
    const resData =
      this.categoryService.loadCategoryDetailByLiveCategory(category);
    this.logger.log(`RES ${resData}`);
    return resData;
  }
}

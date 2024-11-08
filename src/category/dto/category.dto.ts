import { Transform, Expose, Type } from 'class-transformer';

export class CategoryItemDto {
  @Expose()
  playetAt: Date;

  @Expose()
  channelId: string;
}

class CategoryListMetadataDto {
  @Expose()
  @Transform(({ value }) => Number(value))
  pageSize: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  page: number;

  @Expose()
  documentCount: number;
}

export class CategoryListDto {
  @Expose()
  @Type(() => CategoryListMetadataDto)
  metadata: CategoryListMetadataDto;

  @Expose()
  categoryList?: CategoryItemDto[];
}

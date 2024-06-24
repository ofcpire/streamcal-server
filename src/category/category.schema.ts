import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'liveCategories' })
export class LiveCategory extends Document {
  @Prop()
  lastPlayedAt: Date;
  @Prop()
  liveCategory: string;
  @Prop()
  liveCategoryValue: string;
}

export const LiveCategorySchema = SchemaFactory.createForClass(LiveCategory);

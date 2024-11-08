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
  @Prop()
  players: { cannelId: string; playedAt: Date }[];
}

export const LiveCategorySchema = SchemaFactory.createForClass(LiveCategory);

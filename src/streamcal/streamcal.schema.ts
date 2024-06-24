import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timeseries: {
    timeField: 'timeStamp',
    granularity: 'minutes',
  },
})
export class Streamcal extends Document {
  @Prop()
  status: string;
  @Prop()
  liveCategoryValue: string;
  @Prop()
  liveTitle: string;
  @Prop()
  liveCategory: string;
  @Prop()
  channelId: string;
  @Prop()
  timestamp: Date;
}

export const StreamcalSchema = SchemaFactory.createForClass(Streamcal);

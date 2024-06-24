import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'channelInfos' })
export class Channel extends Document {
  @Prop()
  channelId: string;
  @Prop()
  channelName: string;
  @Prop()
  channelImageUrl: string;
  @Prop()
  channelType: string;
  @Prop()
  followerCount: number;
  @Prop()
  verifiedmark: boolean;
  @Prop()
  createdAt: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);

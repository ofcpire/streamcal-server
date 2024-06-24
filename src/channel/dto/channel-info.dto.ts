import { Exclude } from 'class-transformer';

export class ChannelInfoDto {
  @Exclude()
  private readonly followerCount: number;
}

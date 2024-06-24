import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelModule } from './channel/channel.module';
import { StreamcalModule } from './streamcal/streamcal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
    }),
    ChannelModule,
    StreamcalModule,
    CategoryModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
})
export class AppModule {}

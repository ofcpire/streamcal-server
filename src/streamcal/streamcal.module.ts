import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamcalController } from './streamcal.controller';
import { StreamcalService } from './streamcal.service';
import { StreamcalRepository } from './streamcal.repository';
import { ChannelModule } from 'src/channel/channel.module';
import { CategoryModule } from 'src/category/category.module';
import { Streamcal, StreamcalSchema } from './streamcal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Streamcal.name, schema: StreamcalSchema },
    ]),
    ChannelModule,
    CategoryModule,
  ],
  controllers: [StreamcalController],
  providers: [StreamcalService, StreamcalRepository],
})
export class StreamcalModule {}

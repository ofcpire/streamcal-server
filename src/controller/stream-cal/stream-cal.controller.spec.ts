import { Test, TestingModule } from '@nestjs/testing';
import { StreamCalController } from './stream-cal.controller';

describe('StreamCalController', () => {
  let controller: StreamCalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamCalController],
    }).compile();

    controller = module.get<StreamCalController>(StreamCalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

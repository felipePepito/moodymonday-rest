import { Test, TestingModule } from '@nestjs/testing';
import { MoodStateController } from './mood-state.controller';

describe('MoodStateController', () => {
  let controller: MoodStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodStateController],
    }).compile();

    controller = module.get<MoodStateController>(MoodStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { MoodStateController } from './controller/mood-state.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoodState } from "./entities/mood-state.entity";
import { MoodStateService } from "./services/mood-state.service";

@Module({
  controllers: [MoodStateController],
	imports: [
		TypeOrmModule.forFeature([MoodState])
	],
	providers: [
		MoodStateService
	]
})
export class MoodStateModule {}

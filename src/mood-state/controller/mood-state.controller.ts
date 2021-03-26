import { Body, Controller, Get, Post } from "@nestjs/common";
import { MoodState } from "../entities/mood-state.entity";
import { MoodStateService } from "../services/mood-state.service";
import { MoodStateDto } from "../dto/mood-state.dto";

@Controller('mood-state')
export class MoodStateController {

	constructor(
		private moodStateService: MoodStateService
	) {}

	@Get()
	async findAll(): Promise<Array<MoodState>> {
		return await this.moodStateService.findAll();
	}

	@Post()
	async create(@Body() mdto: MoodStateDto) {
		return await this.moodStateService.create(mdto);
	}
}

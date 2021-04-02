import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { MoodState } from "../entities/mood-state.entity";
import { MoodStateService } from "../services/mood-state.service";
import { MoodStateDto } from "../dto/mood-state.dto";
import { JwtGuard } from "../../auth/guards/jwt.guard";


@Controller('mood-state')
export class MoodStateController {

	constructor(
		private moodStateService: MoodStateService
	) {}

	@UseGuards(JwtGuard)
	@Get()
	async findAll(@Request() req): Promise<Array<MoodState>> {
		return await this.moodStateService.findAll(req.user);
	}

	@UseGuards(JwtGuard)
	@Post()
	async create(@Request() req, @Body() mdto: MoodStateDto) {
		mdto.user = req.user;
		return await this.moodStateService.create(mdto);
	}
}

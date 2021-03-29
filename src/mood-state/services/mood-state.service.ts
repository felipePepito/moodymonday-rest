import { BadRequestException, Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoodState } from "../entities/mood-state.entity";
import { Repository } from "typeorm";

@Injectable()
export class MoodStateService{

	constructor(
		@InjectRepository(MoodState)
		private moodStateRepository: Repository<MoodState>
	) {}

	findAll(): Promise<Array<MoodState>> {
		return this.moodStateRepository.find()
			.catch(
				reason => { throw new InternalServerErrorException(); }
			);
	}

	create(moodState: MoodState): Promise<MoodState> {
		return this.moodStateRepository.save(moodState)
			.catch(
				reason => { throw new InternalServerErrorException(); }
			);
	}
}

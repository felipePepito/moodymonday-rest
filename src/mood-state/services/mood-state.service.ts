import { Injectable, OnModuleInit } from "@nestjs/common";
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
		return this.moodStateRepository.find();
	}

	create(moodState: MoodState) {
		this.moodStateRepository.save(moodState);
	}
}

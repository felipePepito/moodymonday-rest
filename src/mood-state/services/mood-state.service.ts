import { BadRequestException, Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoodState } from "../entities/mood-state.entity";
import { Repository } from "typeorm";
import { User } from "../../auth/entities/user.entity";

@Injectable()
export class MoodStateService{

	constructor(
		@InjectRepository(MoodState)
		private moodStateRepository: Repository<MoodState>
	) {}

	findAll(user: User): Promise<Array<MoodState>> {
		return this.moodStateRepository.find({
			where: {user}
		})
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

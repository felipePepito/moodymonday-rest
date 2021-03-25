import { IsDateString, IsNumber, IsOptional } from "class-validator";
import { Column } from "typeorm";

export class MoodStateDto {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsDateString()
	date: Date;

	@IsNumber()
	valence: number;

	@IsNumber()
	arousal: number;

	@IsNumber()
	anger: number;

	@IsNumber()
	sadness: number;
}

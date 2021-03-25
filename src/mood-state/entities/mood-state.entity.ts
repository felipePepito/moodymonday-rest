import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MoodState {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	date: Date;

	@Column()
	valence: number;

	@Column()
	arousal: number;

	@Column()
	anger: number;

	@Column()
	sadness: number;
}

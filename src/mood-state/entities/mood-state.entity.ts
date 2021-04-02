import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";

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

	@ManyToOne(() => User, user => user.moodStates, {
		onDelete: "CASCADE"
	})
	user: User;
}

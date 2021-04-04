import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MoodState } from "../../mood-state/entities/mood-state.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string

	@Column()
	email: string;

	@Column()
	passwordDigest: string;

	@OneToMany(() => MoodState, moodstate => moodstate.user, {
		onDelete: "CASCADE"
	})
	moodStates: MoodState[];

}

import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../auth/entities/user.entity";
import { UserDto } from "../auth/dto/user.dto";
import * as argon2 from "argon2";

@Injectable()
export class UserService {

	private readonly logger = new Logger('UsersService');

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	findOne(email: string): Promise<User | void> {
		return this.userRepository.findOne({where: {email}})
			.catch(reason => this.logger.log(reason));
	}

	async create(udto: UserDto): Promise<User> {
		const user: User = {
			id: undefined,
			email: udto.email,
			passwordDigest: undefined
		};
		return argon2.hash(udto.password)
			.then(digest => {
				user.passwordDigest = digest;
				return this.userRepository.save(user)
					.catch(
						reason => {
							this.logger.error(reason);
							throw new InternalServerErrorException(reason.toString()); }
					);
			})
			.catch(reason => {
				this.logger.error(reason);
				throw new InternalServerErrorException(reason.toString());
			});
	}
}

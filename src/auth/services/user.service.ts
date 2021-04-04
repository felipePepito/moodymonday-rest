import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserRegisterDto } from "../dto/user.register.dto";
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

	async create(udto: UserRegisterDto): Promise<User> {

		// Check if user already exists
		const existingUser = await this.userRepository.findOne({
			where: {email: udto.email}
		});
		if(existingUser) {
			throw new BadRequestException('User already exists.');
		}

		const user = new User();
		user.email = udto.email;
		user.username = udto.username;

		return argon2.hash(udto.password)
			.then(digest => {
				user.passwordDigest = digest;
				return this.userRepository.save(user)
					.catch(
						reason => {
							this.logger.error(reason);
							throw new InternalServerErrorException(reason.toString());
						}
					);
			})
			.catch(reason => {
				this.logger.error(reason);
				throw new InternalServerErrorException(reason.toString());
			});
	}
}

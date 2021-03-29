import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "../dto/user.dto";
import * as argon2 from "argon2";

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	create(udto: UserDto): Promise<User> {

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
						reason => { throw new InternalServerErrorException(reason.toString()); }
					);
			})
			.catch(reason => {
				console.log(reason);
				throw new InternalServerErrorException(reason.toString());
			});
	}

}

import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "../../user/user.service";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

	private readonly logger = new Logger('UsersService');

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findOne(email);

		if (user && await argon2.verify(user.passwordDigest, password)){
			const {passwordDigest, ... result} = user;
			return result;
		} else {
			return null;
		}
	}

	async login(user: { id: number; email: string; }) {
		const payload = { username: user.email, sub: user.id }
		return {
			access_token: this.jwtService.sign(payload)
		}
	}



}

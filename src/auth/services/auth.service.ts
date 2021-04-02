import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { UserInterface } from "../user.interface";

@Injectable()
export class AuthService {

	private readonly logger = new Logger('UsersService');

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, password: string): Promise<UserInterface> {
		const user = await this.userService.findOne(email);
		if (user && await argon2.verify(user.passwordDigest, password)){
			const {passwordDigest, ... result} = user;
			return result;
		} else {
			return null;
		}
	}

	async login(user: UserInterface) {
		const payload = { username: user.email, sub: user.id }
		return {
			access_token: this.jwtService.sign(payload)
		}
	}



}

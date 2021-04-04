import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { UserReturnDto } from "../dto/user.return.dto";

@Injectable()
export class AuthService {

	private readonly logger = new Logger('UsersService');

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, password: string): Promise<UserReturnDto> {
		const user = await this.userService.findOne(email);
		if (user && await argon2.verify(user.passwordDigest, password)){
			return new UserReturnDto(user.id, user.username, user.email, undefined);
		} else {
			return null;
		}
	}

	async login(id, email): Promise<string> {
		const payload = { username: email, sub: id }
		return this.jwtService.sign(payload);
	}



}
